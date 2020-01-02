@extends('layouts.user')

@section('title', 'Playground')



@section('content')
    <h1>Testing</h1>



@endsection



    <div id="one">
        @{{ shared.user.name }}
    </div>

    <div id="two">
        @{{ shared.user.name }}
    </div>