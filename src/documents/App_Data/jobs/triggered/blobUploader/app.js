var azure = require('azure');
var blobService = azure.createBlobService();
var async = require('async');
var through = require('through');
var crypto = require('crypto');
var fs = require('fs');

var cssFile = './style.css';

async.waterfall([
    function(callback){
        blobService.getBlobProperties('css', 'omerwazir.css',function(error,blob){
            if(error) callback(error);
            if(blob) callback(null, blob.contentMD5);
        })
    },
    function(blobContentMD5, callback){
        var hash = crypto.createHash('md5');
        hash.setEncoding('base64');
        fs.createReadStream(cssFile).pipe(through(function write(chunk){
            hash.update(chunk);
        }, function end(){
            hash.end();
            callback(null,blobContentMD5, hash.read());
        }));
        },
    function(blobContentMD5, localContentMD5, callback){
        console.log('BlobMD5: ' + blobContentMD5);
        console.log('LocalFileMD5: ' + localContentMD5);
        if(blobContentMD5 !== localContentMD5 ){
                    // Files don't match so PUT file to container
                blobService.putBlockBlobFromFile('css', 'omerwazir.css', cssFile,
                      {contentType: 'text/css'}, function(error, blockBlob, response) {
                          if(!error) {
                            callback(null, blockBlob.blob + ' PUT to container ' + 
                                blockBlob.container + ' response: ' + response.statusCode) ;
                          } else {
                            callback(error);
                          }
                        });
            } else {
                callback(null, 'Files match, nothing was uploaded');
            }
        }
], function (err, result) {
    if(err) console.error('Error: '+ err );
   console.log('Result:' + result); 
});
