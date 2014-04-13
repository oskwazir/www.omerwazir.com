var azure = require('azure');
var async = require('async');
var blobService = azure.createBlobService();
var crypto = require('crypto');
var fs = require('fs');
var cssFile = '../../../../styles/style.css';
var hash = crypto.createHash('md5');

hash.setEncoding('base64');

async.waterfall([
    function(callback){
        blobService.getBlobProperties('css', 'omerwazir.css',function(error,blob){
            if(error) callback(error);
            if(blob) callback(null,blob);
        })
    },
    function(blob, callback){
    
        var readStream = fs.createReadStream(cssFile);
        
        readStream.on('data',function(chunk){
            hash.update(chunk)
        })

        readStream.on('end', function() {
            hash.end();
            var md5sum = hash.read();
            if(blob.contentMD5 !== md5sum ){
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
        });
    }
], function (err, result) {
    if(err) console.error('Error: '+ err );
   console.log('Result:' + result); 
});

