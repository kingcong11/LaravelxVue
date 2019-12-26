@extends('layouts.user')

@section('title', 'Create Project')



@section('content')


    <h3 class="title is-3">Create a new project</h3>

        <form action="/projects" method="POST" @submit.prevent="submitForm" @keydown="errors.clear($event.target.name)">
            {{ csrf_field() }}
            <div class="field">
                <div class="control">
                    <input class="input is-rounded" type="text" name="project_name" placeholder="Name" v-model="project_name">
                    <span class="help is-danger" v-if="errors.exists('project_name')" v-text="errors.get('project_name')"></span>
                </div>
            </div>
                
            <div class="field">
                <div class="control">
                    <input class="input is-rounded" type="text" name="description" placeholder="Project Description" v-model="description">
                    <span class="help is-danger" v-if="errors.exists('description')" v-text="errors.get('description')"></span>
                </div>
            </div>

            <div class="field">
                <button class="button is-primary is-rounded" type="submit" :disabled="errors.any()">Submit</button>
            </div>

        </form>
    
    @if($projects->count() > 0)
        <h3 class="title is-3">Created Projects</h3>

        @foreach ($projects as $project)
            <li>{{ $project->project_name }}</li>
        @endforeach
    @endif



@endsection