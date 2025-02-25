//This data access object will enable interaction with the sql in the actual database
var pmysql = require("promise-mysql");
var pool;

//Creating a pool of connections for this program
pmysql.createPool({
    //For the sake of simplicity this app will allow you to run up to 5 versions of it at once for now
    connectionLimit : 5,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'mydb'
    })
    //p passes back the connection to the database
    .then((p) => {
        pool = p
    })
    .catch((e) => {
        console.log("pool error:" + error)
    })

//Members methods & logic
//Displaying all the beauty squad members
var getMembers = function(){
    return new Promise((resolve, reject)=>{
        pool.query('select  user.id as user_id, user.username as username, user.email as user_email, user.country as user_country, user.birthday as user_dob, user.gender as gender, user.video_reviewer as video_reviewer, user.heard_about as heard_about, user.status as user_status, user.last_login_at as user_last_login_at, user.created_at as user_created_at, p.name as profile_name, p.surname as profile_surname, p.instagram_handle as profile_instagram_handle, p.tiktok_handle as profile_tiktok_handle, p.instagram_followers as instagram_followers, p.sharing as profile_sharing, p.attributes_privacy as profile_attributes_privacy, p.bio as profile_bio, p.profile_image_id as profile_image_id, fu.file_path as profile_image_url, p.newsletter as profile_newsletter, uat.skin_tone as ua_skin_tone, uat.skin_complexion as ua_skin_complexion, uat.sensitive_skin as ua_sensitive_skin, uat.skin_type as ua_skin_type, uat.skin_concern_fine_lines as ua_skin_concerns_fine_lines, uat.skin_concern_breakouts as ua_skin_concerns_breakouts, uat.skin_concern_large_pores as ua_skin_concerns_large_pores, uat.skin_concern_hyper_pigmentation as ua_skin_concerns_hyper_pigmentation, uat.skin_concern_uneven_tone as ua_skin_concerns_uneven_tone, uat.skin_concern_dehydration as ua_skin_concerns_dehydration, uat.skin_concern_acne as ua_skin_concerns_acne, uat.skin_concern_dull_skin as ua_skin_dull_skin, uat.skin_concern_rosacea as ua_skin_concerns_rosacea, uat.skin_concern_dark_spots as ua_skin_concerns_dark_spots, uat.skin_concern_sun_damage as ua_skin_concerns_sun_damage, uat.skin_concern_puffiness as ua_skin_concerns_puffiness, uat.skin_concern_cystic_acne as ua_skin_concerns_cystic_acne, uat.eye_colour as ua_eye_colour, uat.eye_concern_dark_circles as ua_eye_concerns_dark_circles, uat.eye_concern_lines_wrinkles as ua_eye_concerns_lines_wrinkles, uat.eye_concern_drooping_eyelids as ua_eye_concerns_drooping_eyelids, uat.eye_concern_puffiness as ua_eye_concerns_puffiness, uat.eye_concern_under_eye_hallows as ua_eye_concerns_under_eye_hallows, uat.eye_concern_none as ua_eye_concerns_none, uat.lips_concern_normal as ua_lips_concerns_normal, uat.lips_concern_dry as ua_lips_concerns_dry, uat.lips_concern_cracked as ua_lips_concerns_cracked, uat.lips_concern_cold_sores as ua_lips_concerns_cold_sores, uat.lips_concern_thin as ua_lips_concerns_thin, uat.lips_concern_chapped as ua_lips_concerns_chapped, uat.body_skin_type as ua_body_skin_type, uat.body_skin_concern_cellulite as ua_body_skin_concerns_cellulite, uat.body_skin_concern_stretch_marks as ua_body_skin_concerns_stretch_marks, uat.body_skin_concern_dehydration as ua_body_skin_concerns_dehydration, uat.body_skin_concern_menopausal as ua_body_skin_concerns_menopausal, uat.body_skin_concern_itchy_skin as ua_body_skin_concerns_itchy_skin, uat.body_skin_concern_eczema as ua_body_skin_concerns_eczema, uat.body_skin_concern_psoriasis as ua_body_skin_concerns_psoriasis,uat.body_skin_concern_vitiligo as ua_body_skin_concerns_vitiligo, uat.body_skin_concern_keratosis_pilaris as ua_body_skin_concerns_keratosis_pilaris, uat.body_skin_concern_none as ua_body_skin_concerns_none, uat.hair_structure as ua_hair_structure, uat.hair_moisture_levels as ua_moisture_levels, uat.hair_colour as ua_hair_colour, uat.hair_type as ua_hair_type, uat.hair_colour_treated as ua_hair_colour_treated, uat.hair_colour_treated_how as ua_hair_colour_treated_how, uat.hair_concern_frizz as ua_hair_concerns_frizz, uat.hair_concern_dandruff as ua_hair_concerns_dandruff,uat.hair_concern_damage as ua_hair_concerns_damage,uat.hair_concern_coloured as ua_hair_concerns_coloured,uat.hair_concern_lack_volume as ua_hair_concerns_lack_volume, uat.hair_concern_hair_loss as ua_hair_concerns_hair_loss,uat.hair_concern_ageing_hair as ua_hair_concerns_ageing_hair, uat.hair_concern_split_ends as ua_hair_concerns_split_ends, uat.hair_concern_lack_shine as ua_hair_concerns_lack_shine, uat.hair_concern_psoriasis as ua_hair_concerns_psoriasis, uat.hair_concern_oily_scalp as ua_hair_oily_scalp, uat.hair_concern_itchy_scalp as ua_hair_concern_itchy_scalp, uat.hair_concern_heat_damaged as ua_hair_concern_heat_damaged, uat.hair_concern_thinning as ua_hair_concern_thinning, uat.hair_concern_alopecia as ua_hair_concern_alopecia, uat.hair_concern_dry_scalp as ya_hari_concern_dry_scalp, uat.hair_concern_none as ua_hair_concerns_none, uat.scents_clean as ua_scents_clean, uat.scents_floral as ua_scents_floral, uat.scents_oriental as ua_scents_oriental, uat.scents_woody as ua_scents_woody, uat.scents_citrus as ua_scents_citrus, uat.scents_fruity as ua_scents_fruity, uat.scents_green as ua_scents_green, uat.scents_oceanic as ua_scents_oceanic, uat.scents_spicy as ua_scents_spicy, uat.product_anti_ageing as ua_product_anti_ageing, uat.product_clean as ua_product_clean, uat.product_contains_aloe as ua_product_contains_aloe, uat.product_contains_caffeine as ua_product_contains_caffeine, uat.product_contains_cocoa as ua_product_contains_cocoa, uat.product_contains_retinol as ua_product_contains_retinol, uat.product_contains_shea as ua_product_contains_shea, uat.product_contains_spf as ua_product_contains_spf, uat.product_cruelty_free as ua_product_cruelty_free, uat.product_eco_friendly as ua_product_eco_friendly, uat.product_halal as ua_product_halal, uat.product_natural as ua_product_natural, uat.product_organic as ua_product_organic, uat.product_vegan_friendly as ua_product_vegan_friendly,uat.product_sustainable as ua_product_sustainable,  uat.purchasing_factor1 as ua_purchasing_factor1, uat.purchasing_factor2 as ua_purchasing_factor2, uat.purchasing_factor3 as ua_purchasing_factor3, uat.purchasing_factor4 as ua_purchasing_factor4, uat.purchasing_factor5 as ua_purchasing_factor5, uat.purchasing_factor6 as ua_purchasing_factor6, uat.purchasing_factor7 as ua_purchasing_factor7, uat.purchasing_factor8 as ua_purchasing_factor8, uat.purchasing_factor9 as ua_purchasing_factor9, uat.purchasing_factor10 as ua_purchasing_factor10, uat.try_skincare as ua_try_skincare, uat.try_haircare as ua_try_haircare, uat.try_makeup as ua_try_makeup, uat.education as ua_education, uat.employment as ua_employment, uat.under_18_in_household as ua_under_18_in_home, uat.address_one as ua_address1, uat.address_two as ua_address2, uat.city as ua_city, uat.county as ua_county, uat.postcode as ua_postcode, uat.phone_code as ua_phone_code, uat.phone_number as ua_phone_number, uat.phone_confirmed_at as ua_phone_confirmed_at from user left join profile p on user.id = p.user_id left join user_attribute uat on user.id = uat.user_id left join file_upload fu on p.profile_image_id = fu.id left join user_awards uw on user.id = uw.user_id where uw.award_id = 6;')
        .then((data) => {
            console.log("Members Received")
            resolve(data);
        })
        .catch((error) => {
            console.log("CATCH mySql.Dao.js")
            reject(error)
        })
   })
}

//Participants methods  logic
//Getting the participants from the database to be displayed
var getParticipants = function(){

}

//Campaing methods & logic
var getCampaigns = function(){

}

module.exports = {getMembers, getParticipants, getCampaigns}