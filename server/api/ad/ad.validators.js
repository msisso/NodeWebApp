/**
 * Created by Maor on 1/13/2016.
 */

module.exports = function(ads) {

    /*ads.schema.path('msgImage').validate(function(value)
    {
        return '*.jpg'.test(value) && '*.png'.test(value);
    },'please use only jpg or png files');*/

    ads.schema.path('msgName').validate(function(value)
    {
        return /^[a-zA-Z0-9- ]*$/.test(value);

    },'Do not use special character on Message Name please.');


    ads.schema.path('advTimer').validate(function(value)
    {
        return !isNaN(value) && value > 0;

    },'The duration must be a positive number.');

    ads.schema.path('msgData').validate(function(value)
    {
        return  1 <= value <= 100;

    },'The Message Data is limited to 100 charaters');


}

