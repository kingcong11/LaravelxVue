@extends('layouts.user')

@section('title', 'Create Project')



@section('content')


    <h3 class="title is-3">Create a new project</h3>

        <form action="/projects" method="POST" @submit.prevent="submitForm" @keydown="formService.errors.clear($event.target.name)">
            {{ csrf_field() }}
            <div class="field">
                <div class="control">
                    <input class="input is-rounded" type="text" name="project_name" placeholder="Name" v-model="formService.project_name">
                    <span class="help is-danger" v-if="formService.errors.exists('project_name')" v-text="formService.errors.get('project_name')"></span>
                </div>
            </div>
                
            <div class="field">
                <div class="control">
                    <input class="input is-rounded" type="text" name="description" placeholder="Project Description" v-model="formService.description">
                    <span class="help is-danger" v-if="formService.errors.exists('description')" v-text="formService.errors.get('description')"></span>
                </div>
            </div>

            <div class="field">
                <button class="button is-primary is-rounded" type="submit" :disabled="formService.errors.any()">Submit</button>
            </div>

        </form>
    
    @if($projects->count() > 0)
        <h3 class="title is-3">Created Projects</h3>

        @foreach ($projects as $project)
            <li>{{ $project->project_name }}</li>
        @endforeach
    @endif



@endsection