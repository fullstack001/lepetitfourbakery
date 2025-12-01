<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\WebController;
use App\Models\AboutPageContent;
use App\Models\CateringPageContent;
use App\Models\ContactPageContent;
use App\Models\HomepageContent;
use App\Models\LandingModalContent;
use App\Models\PrivacyCategory;
use App\Models\PrivacyParagraph;
use App\Models\SubscriptionPageContent;
use App\Models\TermsCategory;
use App\Models\TermsParagraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

class ContentController extends WebController
{
    public function main()
    {
        $homepage_content = HomepageContent::first();
        $about_content = AboutPageContent::first();
        $catering_content = CateringPageContent::first();
        $subscription_content = SubscriptionPageContent::first();
        $contact_content = ContactPageContent::first();
        $landing_content = LandingModalContent::first();
        return Inertia::render('Admin/Content/Main', compact([
            'homepage_content',
            'about_content',
            'catering_content',
            'subscription_content',
            'contact_content',
            'landing_content',
        ]));
    }

    protected function processImages($data, $images_array)
    {
        $directoryPath = public_path("images/content");
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }

        foreach($images_array as $image_item) {
            if(!empty($data["{$image_item}_upload"])) {
                $timestamp = now()->timestamp;
                $type = str_replace('_','-',$image_item);
                $filename = "{$type}-{$timestamp}.jpg";
                $file = $data["{$image_item}_upload"];
                $tmpFilePath = $file->getRealPath();
                $image = Image::read($tmpFilePath);
                $width = $image->width();
                $height = $image->height();
                $filepath = "{$directoryPath}/{$filename}";
                $image->save($filepath);
                $data[$image_item] = $filename;
            }
        }
        return $data;
    }

    public function updateHomepageContent(Request $request)
    {
        try {
            $data = $request->validate([

                'hero_background_image_desktop_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'hero_background_image_mobile_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'hero_title' => ['required', 'string'],
                'hero_introduction' => ['required', 'string'],
                'hero_button_1_text' => ['required', 'string'],
                'hero_button_1_url' => ['required', 'string'],
                'hero_button_1_active' => ['required', 'boolean'],
                'hero_button_2_text' => ['required', 'string'],
                'hero_button_2_url' => ['required', 'string'],
                'hero_button_2_active' => ['required', 'boolean'],

                'sneak_peek_title' => ['required', 'string'],
                'sneak_peek_button_text' => ['required', 'string'],

                'origins_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'origins_title' => ['required', 'string'],
                'origins_content_1' => ['required', 'string'],
                'origins_content_2' => ['required', 'string'],

                'team_1_name' => ['required', 'string'],
                'team_1_title' => ['required', 'string'],
                'team_1_quote' => ['required', 'string'],
                'team_1_quote_source' => ['required', 'string'],
                'team_1_quote_date' => ['required', 'string'],
                'team_1_photo_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'team_1_content_1' => ['required', 'string'],
                'team_1_content_2' => ['required', 'string'],

                'team_2_name' => ['required', 'string'],
                'team_2_title' => ['required', 'string'],
                'team_2_quote' => ['required', 'string'],
                'team_2_quote_source' => ['required', 'string'],
                'team_2_quote_date' => ['required', 'string'],
                'team_2_photo_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'team_2_content_1' => ['required', 'string'],
                'team_2_content_2' => ['required', 'string'],

                'tour_title' => ['required', 'string'],

                'tour_1_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'tour_1_title' => ['required', 'string'],
                'tour_1_introduction' => ['required', 'string'],
                'tour_1_button_text' => ['required', 'string'],
                'tour_1_button_link' => ['required', 'string'],
                'tour_1_button_active' => ['required', 'boolean'],

                'tour_2_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'tour_2_title' => ['required', 'string'],
                'tour_2_introduction' => ['required', 'string'],
                'tour_2_button_text' => ['required', 'string'],
                'tour_2_button_link' => ['required', 'string'],
                'tour_2_button_active' => ['required', 'boolean'],

            ]);
            $images_array = [
                'hero_background_image_desktop',
                'hero_background_image_mobile',
                'origins_image',
                'team_1_photo',
                'team_2_photo',
                'tour_1_image',
                'tour_2_image',
            ];
            $data = $this->processImages($data, $images_array);
            HomepageContent::first()->update($data);
            return $this->success('Content updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateAboutContent(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => ['required', 'string'],
                'introduction' => ['required', 'string'],
                'module_1_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_1_title' => ['nullable', 'string'],
                'module_1_button_text' => ['nullable', 'required_with:module_1_button_link', 'string'],
                'module_1_button_link' => ['nullable', 'required_with:module_1_button_text', 'string', 'url'],
                'module_2_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_2_title' => ['nullable', 'string'],
                'module_2_button_text' => ['nullable', 'required_with:module_2_button_link', 'string'],
                'module_2_button_link' => ['nullable', 'required_with:module_2_button_text', 'string', 'url'],
                'module_3_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_3_title' => ['nullable', 'string'],
                'module_3_button_text' => ['nullable', 'required_with:module_3_button_link', 'string'],
                'module_3_button_link' => ['nullable', 'required_with:module_3_button_text', 'string', 'url'],
                'module_4_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_4_title' => ['nullable', 'string'],
                'module_4_button_text' => ['nullable', 'required_with:module_4_button_link', 'string'],
                'module_4_button_link' => ['nullable', 'required_with:module_4_button_text', 'string', 'url'],
                'module_5_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_5_title' => ['nullable', 'string'],
                'module_5_button_text' => ['nullable', 'required_with:module_5_button_link', 'string'],
                'module_5_button_link' => ['nullable', 'required_with:module_5_button_text', 'string', 'url'],
                'module_6_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_6_title' => ['nullable', 'string'],
                'module_6_button_text' => ['nullable', 'required_with:module_6_button_link', 'string'],
                'module_6_button_link' => ['nullable', 'required_with:module_6_button_text', 'string', 'url'],
                'module_7_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_7_title' => ['nullable', 'string'],
                'module_7_button_text' => ['nullable', 'required_with:module_7_button_link', 'string'],
                'module_7_button_link' => ['nullable', 'required_with:module_7_button_text', 'string', 'url'],
                'module_8_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_8_title' => ['nullable', 'string'],
                'module_8_button_text' => ['nullable', 'required_with:module_8_button_link', 'string'],
                'module_8_button_link' => ['nullable', 'required_with:module_8_button_text', 'string', 'url'],
                'module_9_image_upload' => ['nullable', 'image', 'mimes:jpg,png', 'max:10000'],
                'module_9_title' => ['nullable', 'string'],
                'module_9_button_text' => ['nullable', 'required_with:module_9_button_link', 'string'],
                'module_9_button_link' => ['nullable', 'required_with:module_9_button_text', 'string', 'url'],
                'testimonials_title' => ['required', 'string'],
                'testimonials_introduction' => ['required', 'string'],
                'testimonial_1_name' => ['required', 'string'],
                'testimonial_1_content' => ['required', 'string'],
                'testimonial_2_name' => ['required', 'string'],
                'testimonial_2_content' => ['required', 'string'],
                'testimonial_3_name' => ['required', 'string'],
                'testimonial_3_content' => ['required', 'string'],
                'instructions_baked_goods_title' => ['required', 'string'],
                'instructions_baked_goods_youtube_video_id' => ['nullable', 'string'],
            ]);
            $images_array = [
                'module_1_image',
                'module_2_image',
                'module_3_image',
                'module_4_image',
                'module_5_image',
                'module_6_image',
                'module_7_image',
                'module_8_image',
                'module_9_image',
            ];
            $data = $this->processImages($data, $images_array);
            AboutPageContent::first()->update($data);
            return $this->success('Content updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateCateringContent(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => ['required', 'string'],
                'introduction' => ['required', 'string'],
            ]);
            CateringPageContent::first()->update($data);
            return $this->success('Content updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateSubscriptionContent(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => ['required', 'string'],
                'introduction' => ['required', 'string'],
                'box_title' => ['required', 'string'],
                'subscribed_instructions' => ['required', 'string'],
                'feature_1_icon' => ['required', 'string'],
                'feature_1_title' => ['required', 'string'],
                'feature_1_content' => ['required', 'string'],
                'feature_2_icon' => ['required', 'string'],
                'feature_2_title' => ['required', 'string'],
                'feature_2_content' => ['required', 'string'],
                'feature_3_icon' => ['required', 'string'],
                'feature_3_title' => ['required', 'string'],
                'feature_3_content' => ['required', 'string'],
            ]);
            SubscriptionPageContent::first()->update($data);
            return $this->success('Content updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateContactContent(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => ['required', 'string'],
                'introduction' => ['required', 'string'],
            ]);
            ContactPageContent::first()->update($data);
            return $this->success('Content updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateModalContent(Request $request)
    {
        try {
            $data = $request->validate([
                'title' => ['required', 'string'],
            ]);
            LandingModalContent::first()->update($data);
            return $this->success('Content updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function legal()
    {
        return Inertia::render('Admin/Content/Legal');
    }

    public function terms()
    {
        $categories = TermsCategory::with(['paragraphs'])->orderBy('position')->get();
        return Inertia::render('Admin/Content/Terms', compact(['categories']));
    }

    public function privacy()
    {
        $categories = PrivacyCategory::with(['paragraphs'])->orderBy('position')->get();
        return Inertia::render('Admin/Content/Privacy', compact(['categories']));
    }

    public function createTermsCategory(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:5'],
        ]);
        try {
            $next_position = (TermsCategory::max('position')??0) + 1;
            $data['position'] = $next_position;
            TermsCategory::create($data);
            return $this->success('Category created');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateTermsCategory(TermsCategory $category, Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:5'],
        ]);
        try {
            $category->update($data);
            return $this->success('Category updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function createPrivacyCategory(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:5'],
        ]);
        try {
            $next_position = (PrivacyCategory::max('position')??0) + 1;
            $data['position'] = $next_position;
            PrivacyCategory::create($data);
            return $this->success('Category created');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updatePrivacyCategory(PrivacyCategory $category, Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:5'],
        ]);
        try {
            $category->update($data);
            return $this->success('Category updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function createTermsParagraph(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['required', 'integer', 'exists:terms_categories,id'],
            'title' => ['required', 'string', 'min:5'],
            'content' => ['required', 'string', 'min:5'],
        ]);
        try {
            $next_position = (TermsParagraph::max('position')??0) + 1;
            $data['position'] = $next_position;
            TermsParagraph::create($data);
            return $this->success('Paragraph created');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateTermsParagraph(TermsParagraph $paragraph, Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:5'],
            'content' => ['required', 'string', 'min:5'],
        ]);
        try {
            $paragraph->update($data);
            return $this->success('Paragraph updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function createPrivacyParagraph(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['required', 'integer', 'exists:terms_categories,id'],
            'title' => ['required', 'string', 'min:5'],
            'content' => ['required', 'string', 'min:5'],
        ]);
        try {
            $next_position = (PrivacyParagraph::max('position')??0) + 1;
            $data['position'] = $next_position;
            PrivacyParagraph::create($data);
            return $this->success('Paragraph created');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updatePrivacyParagraph(PrivacyParagraph $paragraph, Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:5'],
            'content' => ['required', 'string', 'min:5'],
        ]);
        try {
            $paragraph->update($data);
            return $this->success('Paragraph updated');
        } catch (ValidationException|\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateTermsOrder(Request $request)
    {
        try {
            $categories = $request->input('categories');
            foreach($categories as $category_position => $category_array) {
                $category_position++;
                $category = TermsCategory::where('id', $category_array['id'])
                    ->with('paragraphs')->first();
                if(!is_null($category)) {
                    $paragraphs = $category->paragraphs;
                    $category->update(['position' => $category_position]);
                    foreach($category_array['paragraphs'] as $paragraph_position => $paragraph_array) {
                        $paragraph_position++;
                        $paragraph = $paragraphs->where('id', $paragraph_array['id'])->first();
                        $paragraph->update(['position' => $paragraph_position]);
                    }
                }
            }
            return $this->success('Terms & Conditions order updated');
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updatePrivacyOrder(Request $request)
    {
        try {
            $categories = $request->input('categories');
            foreach($categories as $category_position => $category_array) {
                $category_position++;
                $category = PrivacyCategory::where('id', $category_array['id'])
                    ->with('paragraphs')->first();
                if(!is_null($category)) {
                    $paragraphs = $category->paragraphs;
                    $category->update(['position' => $category_position]);
                    foreach($category_array['paragraphs'] as $paragraph_position => $paragraph_array) {
                        $paragraph_position++;
                        $paragraph = $paragraphs->where('id', $paragraph_array['id'])->first();
                        $paragraph->update(['position' => $paragraph_position]);
                    }
                }
            }
            return $this->success('Privacy Policy order updated');
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

}
