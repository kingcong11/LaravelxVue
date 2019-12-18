@extends('layouts.user')

@section('title', 'Create Project')



@section('content')


    <h3 class="title is-3">Create a new project</h3>

    


        <form action="/projects" method="POST">
            {{ csrf_field() }}
            <div class="field">
                <div class="control">
                    <input class="input is-rounded" type="text" name="project_name" placeholder="Name">
                </div>
            </div>
                
            <div class="field">
                <div class="control">
                    <input class="input is-rounded" type="text" name="description" placeholder="Project Description">
                </div>
            </div>

            <div class="field">
                <button class="button is-primary is-rounded" type="submit">Rounded</button>
            </div>
            @if($errors->any())

                <div class="alert alert-danger">
                    <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                    </ul>
                </div>

            @endif            

        </form>

    <br>


    @if($projects->count() > 0)
        <h3 class="title is-3">Created Projects</h3>

        @foreach ($projects as $project)
            <li>{{ $project->project_name }}</li>
        @endforeach

    @endif







        
            



@endsection