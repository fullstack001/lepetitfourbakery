<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\WebController;
use App\Models\BoxProduct;
use App\Models\CategoryProduct;
use App\Models\EventMenuCategory;
use App\Models\EventMenuProduct;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductVariation;
use App\Models\SubscriptionProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use \Imagick;
use \ImagickPixel;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

class ProductsController extends WebController
{
    // CATEGORIES
    public function categories()
    {
        $categories = ProductCategory::withCount('products')->orderBy('position')->get();
        return Inertia::render('Admin/Categories/List', compact([
            'categories',
        ]));
    }

    public function createCategory(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'unique:product_categories'],
        ]);
        ProductCategory::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'position' => (ProductCategory::max('position')??0) + 1,
        ]);
    }

    public function updateCategory(ProductCategory $category, Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', Rule::unique('product_categories')->ignore($category->id)],
        ]);
        $category->update([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
        ]);
    }

    public function reorderGroups(Request $request)
    {
        try {
            $position = 0;
            $categories = ProductCategory::get();
            foreach ($request->input('list') as $uid) {
                $position++;
                $category = $categories->where('uid', $uid)->first();
                $category->update(['position' => $position]);
            }
        } catch (\Exception $e) {
            return $this->error('An error occurred');
        }
        return $this->success('The order of the groups was successfully updated');
    }

    // PRODUCTS
    public function products()
    {
        $categories = ProductCategory::orderBy('name')->get();
        $event_menu_categories = EventMenuCategory::orderBy('name')->get();
        $products = Product::with(['categories', 'event_menu_categories', 'variations'])
            ->where('deleted', false)
            ->orderBy('name')->get();
        $boxable_products = Product::with(['variations' => function($q) {
            $q->where('is_box', false);
        }])
            ->where('deleted', false)
            ->orderBy('name')->get();
        $products->append(['category_uids', 'event_menu_category_uids']);
        $products->each(function ($product) {
            $product->variations->each(function ($variation) {
                $variation->append(['box_product_uids','box_product_quantities', 'box_contents']);
            });
        });
        return Inertia::render('Admin/Products/List', compact([
            'categories', 'event_menu_categories', 'products', 'boxable_products',
        ]));
    }

    public function createProduct(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'in_sneak_peek_menu' => ['required', 'boolean'],
            'in_catering_menu' => ['required', 'boolean'],
            'in_add_ons_menu' => ['required', 'boolean'],
            'active' => ['required', 'boolean'],
            'weekend_only' => ['required', 'boolean'],
            'allow_client_note' => ['required', 'boolean'],
            'categories' => ['required', 'array', 'exists:product_categories,uid'],
            'event_menu_categories' => ['nullable', 'array', 'exists:event_menu_categories,uid'],
        ], [
            'name.*' => 'Please enter a valid name',
            'categories.*' => 'Please select at least one category',
        ]);
        try {
//            $data['price_string'] = '$' . number_format($data['price'], 2, '.', ',');
            $product = Product::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'in_sneak_peek_menu' => $data['in_sneak_peek_menu'],
                'in_catering_menu' => (count($data['event_menu_categories']??[]) > 0),
                'in_add_ons_menu' => $data['in_add_ons_menu'],
                'active' => $data['active'],
                'weekend_only' => $data['weekend_only'],
                'allow_client_note' => $data['allow_client_note'],
            ]);
            $categories = ProductCategory::get();
            if(count($data['categories']) > 0) {
                $selected_categories = $categories->whereIn('uid', $data['categories'])->pluck('id')->toArray();
                foreach($selected_categories as $category_id) {
                    CategoryProduct::create([
                        'category_id' => $category_id,
                        'product_id' => $product->id,
                    ]);
                }
            }
            $event_menu_categories = EventMenuCategory::get();
            if(count($data['event_menu_categories']??[]) > 0) {
                $selected_categories = $event_menu_categories->whereIn('uid', $data['event_menu_categories'])->pluck('id')->toArray();
                foreach($selected_categories as $category_id) {
                    EventMenuProduct::create([
                        'event_menu_category_id' => $category_id,
                        'product_id' => $product->id,
                    ]);
                }
            }
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => ['An error occurred'],
            ]);
        }
        return $this->success('The product was successfully created');
    }

    public function updateProduct(Product $product, Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'in_sneak_peek_menu' => ['required', 'boolean'],
            'in_catering_menu' => ['required', 'boolean'],
            'in_add_ons_menu' => ['required', 'boolean'],
            'active' => ['required', 'boolean'],
            'weekend_only' => ['required', 'boolean'],
            'allow_client_note' => ['required', 'boolean'],
            'categories' => ['required', 'array', 'exists:product_categories,uid'],
            'event_menu_categories' => ['nullable', 'array', 'exists:event_menu_categories,uid'],
        ], [
            'name.*' => 'Please enter a valid name',
            'categories.*' => 'Please select at least one category',
        ]);
        try {
//            $data['price_string'] = '$' . number_format($data['price'], 2, '.', ',');
            if(Str::lower($data['name']) === 'delete product') {
                if(SubscriptionProduct::where('product_id', $product->id)->exists()) {
                    throw ValidationException::withMessages([
                        'msg' => ['This product is part of a subscription plan and cannot be deleted'],
                    ]);
                }
                if(OrderItem::where('product_id', $product->id)->whereNull('order_id')->exists()) {
                    throw ValidationException::withMessages([
                        'msg' => ['This product is part of an order/cart and cannot be deleted'],
                    ]);
                }
                foreach($product->variations as $variation) {
                    if(SubscriptionProduct::where('variation_id', $variation->id)->exists()) {
                        throw ValidationException::withMessages([
                            'msg' => ['The variation ' .$variation->name. ' is part of a subscription plan and cannot be deleted'],
                        ]);
                    }
                    if(OrderItem::where('variation_id', $variation->id)->whereNull('order_id')->exists()) {
                        throw ValidationException::withMessages([
                            'msg' => ['The variation ' .$variation->name. ' is part of a cart and cannot be deleted'],
                        ]);
                    }
                }
                $data['name'] = $product->name;
                $data['deleted'] = true;
                $data['in_sneak_peek_menu'] = false;
                $data['in_catering_menu'] = false;
                $data['in_add_ons_menu'] = false;
                foreach($product->variations as $variation) {
                    $variation->update([
                        'deleted' => true,
                    ]);
                }
            }
            $product->update([
                'name' => $data['name'],
                'description' => $data['description'],
                'in_sneak_peek_menu' => $data['in_sneak_peek_menu'],
                'in_catering_menu' => (count($data['event_menu_categories']??[]) > 0),
                'in_add_ons_menu' => $data['in_add_ons_menu'],
                'active' => $data['active'],
                'weekend_only' => $data['weekend_only'],
                'allow_client_note' => $data['allow_client_note'],
                'deleted' => (array_key_exists('deleted',$data) ? $data['deleted'] : false),
            ]);
            $categories = ProductCategory::get();
            if(count($data['categories']) > 0) {
                $selected_category_ids = $categories->whereIn('uid', $data['categories'])->pluck('id')->toArray();
                CategoryProduct::where('product_id', $product->id)->whereNotIn('category_id', $selected_category_ids)->delete();
                foreach($selected_category_ids as $category_id) {
                    CategoryProduct::firstOrCreate([
                        'category_id' => $category_id,
                        'product_id' => $product->id,
                    ]);
                }
            } else {
                CategoryProduct::where('product_id', $product->id)->delete();
            }
            $event_menu_categories = EventMenuCategory::get();
            if(count($data['event_menu_categories']??[]) > 0) {
                $selected_category_ids = $event_menu_categories->whereIn('uid', $data['event_menu_categories'])->pluck('id')->toArray();
                EventMenuProduct::where('product_id', $product->id)->whereNotIn('event_menu_category_id', $selected_category_ids)->delete();
                foreach($selected_category_ids as $category_id) {
                    EventMenuProduct::firstOrCreate([
                        'event_menu_category_id' => $category_id,
                        'product_id' => $product->id,
                    ]);
                }
            } else {
                EventMenuProduct::where('product_id', $product->id)->delete();
            }
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => [$e->getMessage()],
            ]);
        }
        return $this->success('The product was successfully updated');
    }

    protected function updateProductPrice(Product $product)
    {
        $min_price = $product->variations()->min('price');
        $max_price = $product->variations()->max('price');
        $price_string = '$' . number_format($min_price, 2, '.', ',');
        if($min_price !== $max_price) $price_string = 'from ' . $price_string;
        $price = $min_price;
        $product->update(compact(['price', 'price_string']));
    }

    protected function saveImage(Request $request, $create, $name = null)
    {
        $file = $request->file('image');
        $filename = 'default.jpg';

        if ($file) {
            try {
                $filename = now()->timestamp . '.jpg';
                $tmpFilePath = $file->getRealPath();
                $image = Image::read($tmpFilePath);
                $image->resize(600, 900);
                $filepath = public_path('images/products/' . $filename);
                $image->save($filepath);
                return $filename;
            } catch (\Exception $e) {
//                dd($e);
            }
        } else if(!$create) {
            return $name;
        }

        return $filename;
    }

    public function createVariation(Product $product, Request $request)
    {
        $rules = [
            'name' => ['required', 'string'],
            'items' => ['required', 'integer', 'min:1', 'max:100'],
            'price' => ['required', 'numeric', 'min:1', 'max:100000'],
            'image' => ['nullable', 'mimes:jpg,jpeg,png', 'max:5024'],
            'is_box' => ['required', 'integer', 'in:0,1'],
            'weekend_only_string' => ['required', 'string', 'in:true,false'],
        ];
        if($request->input('is_box') === 1) {
            $rules['variation_uids'] = ['required', 'array', 'min:1'];
            $rules['variation_quantities'] = ['required', 'array', 'min:1'];
        } else {
            $rules['variation_uids'] = ['nullable', 'array'];
            $rules['variation_quantities'] = ['nullable', 'array'];
        }
        $data = $request->validate($rules,[
            'name.*' => 'Please enter a name',
            'items.*' => 'Please enter a number of items',
            'price.*' => 'Please enter a price between 1 and 100000',
            'image.*' => 'Please select a valid image (JPG, PNG)',
            'variation_uids.*' => 'Please select products from the list',
            'variation_quantities.*' => 'Please enter a quantity for each product',
        ]);
        $data['weekend_only'] = $data['weekend_only_string'] === 'true';
        try {
            $data['price_string'] = '$' . number_format($data['price'], 2, '.',',');
            $data['product_id'] = $product->id;
            $data['image'] = $this->saveImage($request, true);
            $data['is_box'] = $data['is_box'] === 1;

            $variation = ProductVariation::create($data);

            if($data['is_box'] == 1) {
                $this->updateBoxContent($product, $variation, $data);
            }

            $this->updateProductPrice($product);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => ['An error occurred'],
            ]);
        }
        return $this->success('The variation was successfully created');
    }

    public function updateVariation(Product $product, ProductVariation $variation, Request $request)
    {
        $rules = [
            'name' => ['required', 'string'],
            'items' => ['required', 'integer', 'min:1', 'max:100'],
            'price' => ['required', 'numeric', 'min:1', 'max:100000'],
            'image' => ['nullable', 'mimes:jpg,jpeg,png', 'max:5024'],
            'is_box' => ['required', 'integer', 'in:0,1'],
            'weekend_only_string' => ['required', 'string', 'in:true,false'],
        ];
        if($request->input('is_box') === 1) {
            $rules['variation_uids'] = ['required', 'array', 'min:1'];
            $rules['variation_quantities'] = ['required', 'array', 'min:1'];
        } else {
            $rules['variation_uids'] = ['nullable', 'array'];
            $rules['variation_quantities'] = ['nullable', 'array'];
        }
        $data = $request->validate($rules,[
            'name.*' => 'Please enter a name',
            'items.*' => 'Please enter a number of items',
            'price.*' => 'Please enter a price between 1 and 100000',
            'image.*' => 'Please select a valid image (JPG, PNG)',
            'variation_uids.*' => 'Please select products from the list',
            'variation_quantities.*' => 'Please enter a quantity for each product',
        ]);
        $data['weekend_only'] = $data['weekend_only_string'] === 'true';
        try {
            $data['price_string'] = '$' . number_format($data['price'], 2, '.',',');
            if(array_key_exists('image', $data)) {
                $data['image'] = $this->saveImage($request, false, $variation->image);
            }
            if(Str::lower($data['name']) === 'delete variation') {
                if(SubscriptionProduct::where('variation_id', $variation->id)->exists()) {
                    throw ValidationException::withMessages([
                        'msg' => ['This variation is part of a subscription plan and cannot be deleted'],
                    ]);
                }
                if(OrderItem::where('variation_id', $variation->id)->whereNull('order_id')->exists()) {
                    throw ValidationException::withMessages([
                        'msg' => ['This variation is part of a cart and cannot be deleted'],
                    ]);
                }
                $data['name'] = $variation->name;
                $data['deleted'] = true;
            }
            $variation->update($data);

            if($data['is_box'] == 1) {
                $this->updateBoxContent($product, $variation, $data);
            }

            $this->updateProductPrice($product);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => [$e->getMessage()],
            ]);
        }
        return $this->success('The variation was successfully updated');
    }

    protected function updateBoxContent(Product $product, ProductVariation $variation, $data)
    {
        // box content
        $uids = $data['variation_uids'];
        $variations = ProductVariation::whereIn('uid', $data['variation_uids'])->get();
        $variation_ids = $variations->pluck('id')->toArray();
        foreach($uids as $uid) {
            $inner_variation = ProductVariation::where('uid', $uid)->first();
            if(!is_null($inner_variation)) {
                BoxProduct::updateOrCreate(
                    [
                        'parent_product_id' => $product->id,
                        'parent_variation_id' => $variation->id,
                        'product_id' => $inner_variation->product_id,
                        'variation_id' => $inner_variation->id,
                    ],[
                        'quantity' => $data['variation_quantities'][$inner_variation->uid]??1,
                    ]
                );
            }
        }
        BoxProduct::where('parent_product_id', $product->id)
            ->where('parent_variation_id', $variation->id)
            ->whereNotIn('variation_id', $variation_ids)
            ->delete();
        // end box content
    }

    public function eventsMenu()
    {
        $categories = EventMenuCategory::withCount(['products'])->orderBy('name')->get();
        return Inertia::render('Admin/EventsMenu/Home', compact(['categories']));
    }

    public function updateEventsMenuCategory(EventMenuCategory $category, Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
        ]);
        try {
            $category->update($data);
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function createEventsMenuCategory(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
        ]);
        try {
            do {
                $uid = Str::uuid()->toString();
            } while (EventMenuCategory::where('uid', $uid)->exists());
            $data['uid'] = $uid;
            $category = EventMenuCategory::create($data);
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function deleteEventsMenuCategory(EventMenuCategory $category)
    {
        try {
            // Delete all related event menu products
            EventMenuProduct::where('event_menu_category_id', $category->id)->delete();
            // Delete the category
            $category->delete();
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function manageEventsMenuProducts(EventMenuCategory $category)
    {
        $selected_products = $category->products;
        $product_uids = $selected_products->pluck('uid');
        $products = Product::where('active', true)->where('deleted', false)->orderBy('name')->get();
        return Inertia::render('Admin/EventsMenu/Products', compact([
            'products', 'selected_products', 'product_uids', 'category',
        ]));
    }

    public function saveEventsMenuProducts(EventMenuCategory $category, Request $request)
    {
        $data = $request->validate([
            'selected' => ['nullable', 'array'],
            'pickup_start_date' => ['nullable', 'date'],
            'pickup_end_date' => ['nullable', 'date', 'after_or_equal:pickup_start_date'],
        ]);
        try {
            $selected_uids = $data['selected']??[];
            $selected_products = Product::whereIn('uid', $selected_uids)->get();
            $selected_ids = $selected_products->pluck('id')->toArray();
            EventMenuProduct::where('event_menu_category_id', $category->id)
                ->whereNotIn('product_id',$selected_ids)->delete();
            foreach($selected_uids as $key => $selected_uid) {
                $product = $selected_products->where('uid', $selected_uid)->first();
                if(!is_null($product)) {
                    EventMenuProduct::updateOrCreate([
                        'event_menu_category_id' => $category->id,
                        'product_id' => $product->id,
                    ],[
                        'position' => ($key + 1),
                    ]);
                }
            }
            // Update pickup date range
            $category->update([
                'pickup_start_date' => $data['pickup_start_date'] ?? null,
                'pickup_end_date' => $data['pickup_end_date'] ?? null,
            ]);
            return $this->success(null);
        } catch (\Exception $e) {
            dd($e); // todo remove
            return $this->error(null);
        }
    }

}
