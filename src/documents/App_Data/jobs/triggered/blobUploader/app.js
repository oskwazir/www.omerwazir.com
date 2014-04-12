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
                    // FILES DON'T MATCH
                    // SEND FILE TO BLOB STORAGE
                    /*
                     blobService.putBlockBlobFromFile('css', 'omerwazir.css', cssFile, {contentType: 'text/css', contentMD5: md5}, function(error) {
                          if(!error) {
                            console.log('omerwazir.css uploaded');
                          } else {
                            console.error('Error: ' + error);
                          }
                        });
                    */
                callback(null, 'PUT BLOB');
            } else {
                callback(null, 'FILES MATCH');
            }
        });
    }
], function (err, result) {
   console.log('Result:' + result); 
});

