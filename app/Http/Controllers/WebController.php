<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use \Imagick;

class WebController extends Controller
{

    protected $request;

    protected $current_user;

    protected $latest_posts;


    /**
     * Create a new controller instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;

        $this->locale = app()->getLocale();

        if(auth()->guest()) {
            session(['from' => app('request')->path()]);
        }
    }

  protected function success($message, $redirect = null, $data = null)
  {
    if ($redirect) {
      return redirect($redirect)->with(['flash' => ['message' => $message, 'data' => $data]]);
    }
    return redirect()->back()->with(['flash' => ['message' => $message, 'data' => $data]]);
  }

  protected function error($message, $redirect = null)
  {
    if ($redirect) {
      return redirect($redirect)->with(['flash' => ['error' => $message]]);
    }
    return redirect()->back()->with(['flash' => ['error' => $message]]);
  }

    protected function jsonException(\Exception $e, $statuscode = -1)
    {
        $exception = [
            'message' => $e->getMessage(),
            'code' => $e->getCode(),
            'trace' => $e->getTrace(),
            'tracestring' => $e->getTraceAsString(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'request_url' => $this->request->fullUrl(),
            'user_id' => Auth::check() ? $this->current_user->id : 0,
            'statuscode' => $statuscode
        ];

        return json_encode($exception);
    }

    protected function jsonSuccess($message = '', ?array $data = [])
    {
        $data = array_merge($data, [
            'status' => 'success',
            'message' => $message
        ]);

        return json_encode($data);
    }

    protected function jsonError($message = '', ?array $data = [])
    {
        $data = array_merge($data, [
            'status' => 'error',
            'message' => $message
        ]);

        return json_encode($data);
    }

    protected function sendMail($data,$recipient=null,$type=null) {
        switch($recipient) {
            case 'user':
                $recipient = Auth::user()->email;
                break;
            default:
                $recipient = env('SUPPORT_EMAIL');
        }
        switch($type) {
            case 'confirmation':
                $email = new EmailConfirmMail($data);
                break;
            default:
                $email = new GlobalMail($data);
        }
        Mail::to($recipient)->send($email);
    }

    protected function removeImage($image_path) {
        if(File::exists($image_path)) {
            File::delete($image_path);
        }
    }

    protected function launchRequest($request) {
        $url = $request['url'];

        $data = http_build_query($request['data']);

        $header_info = '';
        if(array_key_exists('headers',$request)) {
            foreach($request['headers'] as $key=>$info) {
                $header_info .= $key . ': ' . $info . "\r\n";
            }
        }

        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n" .
                    $header_info,
                'method'  => $request['method'],
                'content' => array_key_exists('data',$request) ? $data : null
            )
        );
        $context  = stream_context_create($options);

        $result = file_get_contents($url.($request['method'] === 'GET' ? '?'.$data : null), false, $context);

        return json_decode($result);
    }

    protected function charLib()
    {
        return 'abcdefghijklmnopqrstuvwxyz';
    }

    protected function numberLib()
    {
        return '0123456789';
    }

    protected function generateCode($count = 10, $figures = false)
    {
        if($figures) {
            $lib = str_split($this->numberLib());
        } else {
            $lib = str_split($this->charLib());
        }
        $str = '';
        for($i=0;$i<$count;$i++) {
            $char = $lib[rand(0,(count($lib)-1))];
            if (rand(1,3) === 1) $char = strtoupper($char);
            $str .= $char;
        }
        if($figures) {
            return str_shuffle($str);
        } else {
            return str_shuffle(time() . $str);
        }
    }

    protected function storePicture($request,$destination,$filename,$width=300,$height=300,$crop=true)
    {
        if (!$request->hasFile('image') || !$request->file('image')->isValid()) {
            throw new Exception();
        }


        $image = $request->file('image');

        if(!Storage::exists($destination)) {
            Storage::makeDirectory($destination);
        }

        $extension = 'png';
        $new_name = $filename;

        $ext = strtolower($image->getClientOriginalExtension());

        $orig_img = new Imagick();
        $orig_img->readImage($image->getRealPath());

        $new_width = $width;
        $new_height = $height;

        $thumbnail = $orig_img;

        if($crop) {
            $thumbnail->resizeImage($new_width,$new_height,Imagick::FILTER_LANCZOS,1,true);
            $thumbnail->cropThumbnailImage($new_width,$new_height);
        } else {
            $thumbnail->scaleImage($new_width,0);
        }


        $filepath = Storage::path($destination);
        $thumbnail->setImageFilename($filepath . '/' . $new_name . '.'. $extension);
        $thumbnail->writeImage();
        return [$filepath,$new_name . '.' . $extension];
    }

    protected function scalePicture($type,$request,$destination,$filename,$width)
    {
        if (!$request->hasFile($type) || !$request->file($type)->isValid()) {
            throw new Exception();
        }
        $image = $request->file($type);

        if(!Storage::exists($destination)) {
            Storage::makeDirectory($destination);
        }

        $extension = 'png';
        $new_name = $filename;

        $ext = strtolower($image->getClientOriginalExtension());

        $orig_img = new Imagick();
        $orig_img->readImage($image->getRealPath());

        $new_width = $width;
        $new_height = ($new_width * $orig_img->getImageHeight()) / $orig_img->getImageWidth();

        $thumbnail = $orig_img;

        $thumbnail->resizeImage($new_width,$new_height,Imagick::FILTER_LANCZOS,1,true);
        $thumbnail->cropThumbnailImage($new_width,$new_height);

        $filepath = Storage::path($destination);
        $thumbnail->setImageFilename($filepath . DS . $new_name . DT. $extension);
        $thumbnail->writeImage();
        return [$filepath,$new_name . DT . $extension];
    }

    protected function removePicture($image)
    {
        if(Storage::exists($image)) {
            Storage::delete($image);
        }
    }

//    protected function sendMessage($email,$subject,$content,$code)
//    {
//        $notification = new Notification($subject,$content,$code);
//        Mail::to($email)->send($notification);
//    }

//    protected function sendNotification($email,$subject,$content,$code)
//    {
//        if(app()->environment(['staging','production']))
//        {
//            {
//                $this->sendMessage($email,$subject,$content,$code);
//            }
//        }
//    }

    protected function app_local()
    {
        return app()->environment('local');
    }

    protected function app_global()
    {
        return in_array(app()->environment(),['staging','production']);
    }


}
