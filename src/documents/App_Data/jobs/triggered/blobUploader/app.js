var azure = require('azure');
var async = require('async');
var blobService = azure.createBlobService();
var util = require('util');
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
                } else {
                    // DO NOTHING AND STOP.
                }
                callback(null, 'done');
        });
    }
], function (err, result) {
   console.log('Result:' + result); 
});

// //the file you want to get the hash    
// var fz = fs.createReadStream(cssFile);

// fz.on('end', function() {
//     hash.end();
//     console.log("global hash reading: " + hash.read());
// });

// fz.pipe(hash);

// /************
// *************/

// function setBlobMD5(error,blob){
//     if(error) {
//         console.log('Error: ' + error);
//         return null;
//     }
    
//     if(blob){
//         blobMD5 = blob.contentMD5;
//     }
// }

// //***************************************

var uploadToCDN = function(md5){
    console.log('md5: ' + md5);
   
}

// var getBlobMD5 = function(){

//     blobService.getBlobProperties('css', 'omerwazir.css',setBlobMD5)

// }
