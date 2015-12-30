/**
 * Created by Maor on 12/29/2015.
 */


module.exports = function(app,upload) {

    // configure upload middleware
    upload.configure({
        uploadDir: app.get('clientPath') + '/assets/public/imgUploaded',
        uploadUrl: '/upload',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });


}
