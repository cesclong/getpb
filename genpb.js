/**
 * [path description]
* Author: cesclong
* Date: 2016-03-16 11:43:36
 * @type {[type]}
 */
var path = require('path');
var fs = require('fs');
var glob = require('glob');
require('shelljs/global'); //add shelljs module

function gen() {
  var absPathForCurrent = path.resolve("./");
    var pattern =   "*.proto";
    var files = glob.sync( pattern, {nodir:true});

    var cmdList = [];
    var fileList = [];
    files.forEach(function (item) {
        // var sub = item.substring(item.indexOf(".proto")); // get.proto
        var subName = item.substring(0,item.indexOf(".proto"));//get name
        var pbFileName = subName + ".pb";
        var cmd = "protoc --descriptor_set_out " + pbFileName + " " + item;
        cmdList.push(cmd);
        fileList.push(pbFileName);
    }); 

    console.log(">>>>>>>准备生成pb文件<<<<<<<");
    var _index = 0;
    cmdList.forEach(function (item) {
        console.log("+++++++正在生成---->" + fileList[_index]);
        if (exec(item).code  !== 0 ) {//convert failed
                echo('Error: Convert Failed');
                exit(1);
        }
        _index = _index + 1;
    });
    console.log(">>>>>>>生成pb文件完成,共生成" +(_index)+ "个pb文件" +"<<<<<<<");
}

module.exports.gen  = gen;