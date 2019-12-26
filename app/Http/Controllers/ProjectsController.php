<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{

    public function index()
    {
        //
        return Project::all();
    }

    public function create()
    {

        $data = [
            'projects' => Project::all()
        ];

        return view('projects.create', $data);
    }

    public function store(Request $request)
    {
        $validatedFields = $this->validateProject();

        $newProject = Project::create($validatedFields);

        return [
            'message' => "Project successfuly created",
            'responseCode' => 1
        ];
    }

    public function show(Project $project)
    {
        return Project::findOrFail($project);
    }

    public function edit(Project $project)
    {
        //
    }

    public function update(Request $request, Project $project)
    {
        $res = Project::update($project);

        return $res;
        
    }

    public function destroy($id)
    {
        $res = Project::find($id);

        $res->delete();

        return [
            'success' => true
        ];
    }

    public function validateProject(){
        return request()->validate([
            'project_name' => 'required|min:3',
            'description'  => 'required|min:3'
        ]);
    }
}
