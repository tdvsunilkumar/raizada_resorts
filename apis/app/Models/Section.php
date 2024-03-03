<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Panoscape\History\HasHistories;
use DB;

class Section extends Model
{
    use HasFactory, HasHistories;

    public function getList($request){
        $q            = $request->q;
        $section_type = $request->section_type;
        $sql = DB::table('sections');
        if(!empty($section_type) && isset($section_type)){
            $sql->where(function ($sql) use($section_type) {
                $sql->where('type',$section_type);

            });
        }
        if(!empty($q) && isset($q)){
            $sql->where(function ($sql) use($q) {
                $sql->orWhere('type',$q);

            });
        }
        $dataCount = $sql->count();
        if($request->has('page')){
                $offset = ($request->page-1)*$request->per_page;
                $sql->offset($offset)->limit($request->per_page);
        }
        $sql->orderBy('id','desc');
        $data = $sql->get();
        return ['data' => $data,'cnt'=>$dataCount];
    }

    public function getModelLabel()
    {
        return $this->display_name;
    }
}
