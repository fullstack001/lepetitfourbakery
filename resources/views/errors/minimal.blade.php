<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <style>
        body {
            background-color: #111;
            color: #eee;
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
        }
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        h2 {
            font-size: 20px;
            font-weight: normal;
        }
        p {
            font-size: 12px;
        }
        .button {
            color: #fff;
            background: #000;
            text-decoration: none;
            padding: 10px 14px;
        }
    </style>
</head>
<body>
<div class="container">
    <div>
        <h2>@yield('message')</h2>
        @if($refresh ?? false)
        <div>
            <p>Please refresh this page and try again</p>
        </div>
        @endif
    </div>
</div>
</body>
</html>
