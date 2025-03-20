//This data access object will enable interaction with the sql in the actual database
var pmysql = require("promise-mysql");
var pool;
var host = 'localhost';
var user = 'root';
var password = 'root';
var database = 'mydb';

//Creating a pool of connections for this program
pmysql.createPool({
    //For the sake of simplicity this app will allow you to run up to 5 versions of it at once for now
    connectionLimit: 5,
    host: host,
    user: user,
    password: password,
    database: database
})
.then((p) => {
    pool = p
})
.catch((e) => {
    console.log("pool error:" + error)
})

var login = function (hostname, username, password, database) {
    this.hostname = hostname;
    this.username = username;
    this.password = password;
    this.database = database;
    /*
    return new Promise((resolve, reject) => {
        pmysql.createPool({
            connectionLimit: 5,
            host: hostname,
            user: username,
            password: password,
            database: database
        })
        .then((p) => {
            pool = p
            resolve("Connected to database")
        })
        .catch((e) => {
            reject(e)
        })
    })*/
}

//Members methods & logic
//Displaying all the beauty squad members
var getMembers = function () {
    return new Promise((resolve, reject) => {
        pool.query('select  user.id as user_id, user.username as username, user.email as user_email, user.country as user_country, user.birthday as user_dob, user.gender as gender, user.video_reviewer as video_reviewer, user.heard_about as heard_about, user.status as user_status, user.last_login_at as user_last_login_at, user.created_at as user_created_at, p.name as profile_name, p.surname as profile_surname, p.instagram_handle as profile_instagram_handle, p.tiktok_handle as profile_tiktok_handle, p.instagram_followers as instagram_followers, p.sharing as profile_sharing, p.attributes_privacy as profile_attributes_privacy, p.bio as profile_bio, p.profile_image_id as profile_image_id, fu.file_path as profile_image_url, p.newsletter as profile_newsletter, uat.skin_tone as ua_skin_tone, uat.skin_complexion as ua_skin_complexion, uat.sensitive_skin as ua_sensitive_skin, uat.skin_type as ua_skin_type, uat.skin_concern_fine_lines as ua_skin_concerns_fine_lines, uat.skin_concern_breakouts as ua_skin_concerns_breakouts, uat.skin_concern_large_pores as ua_skin_concerns_large_pores, uat.skin_concern_hyper_pigmentation as ua_skin_concerns_hyper_pigmentation, uat.skin_concern_uneven_tone as ua_skin_concerns_uneven_tone, uat.skin_concern_dehydration as ua_skin_concerns_dehydration, uat.skin_concern_acne as ua_skin_concerns_acne, uat.skin_concern_dull_skin as ua_skin_dull_skin, uat.skin_concern_rosacea as ua_skin_concerns_rosacea, uat.skin_concern_dark_spots as ua_skin_concerns_dark_spots, uat.skin_concern_sun_damage as ua_skin_concerns_sun_damage, uat.skin_concern_puffiness as ua_skin_concerns_puffiness, uat.skin_concern_cystic_acne as ua_skin_concerns_cystic_acne, uat.eye_colour as ua_eye_colour, uat.eye_concern_dark_circles as ua_eye_concerns_dark_circles, uat.eye_concern_lines_wrinkles as ua_eye_concerns_lines_wrinkles, uat.eye_concern_drooping_eyelids as ua_eye_concerns_drooping_eyelids, uat.eye_concern_puffiness as ua_eye_concerns_puffiness, uat.eye_concern_under_eye_hallows as ua_eye_concerns_under_eye_hallows, uat.eye_concern_none as ua_eye_concerns_none, uat.lips_concern_normal as ua_lips_concerns_normal, uat.lips_concern_dry as ua_lips_concerns_dry, uat.lips_concern_cracked as ua_lips_concerns_cracked, uat.lips_concern_cold_sores as ua_lips_concerns_cold_sores, uat.lips_concern_thin as ua_lips_concerns_thin, uat.lips_concern_chapped as ua_lips_concerns_chapped, uat.body_skin_type as ua_body_skin_type, uat.body_skin_concern_cellulite as ua_body_skin_concerns_cellulite, uat.body_skin_concern_stretch_marks as ua_body_skin_concerns_stretch_marks, uat.body_skin_concern_dehydration as ua_body_skin_concerns_dehydration, uat.body_skin_concern_menopausal as ua_body_skin_concerns_menopausal, uat.body_skin_concern_itchy_skin as ua_body_skin_concerns_itchy_skin, uat.body_skin_concern_eczema as ua_body_skin_concerns_eczema, uat.body_skin_concern_psoriasis as ua_body_skin_concerns_psoriasis,uat.body_skin_concern_vitiligo as ua_body_skin_concerns_vitiligo, uat.body_skin_concern_keratosis_pilaris as ua_body_skin_concerns_keratosis_pilaris, uat.body_skin_concern_none as ua_body_skin_concerns_none, uat.hair_structure as ua_hair_structure, uat.hair_moisture_levels as ua_moisture_levels, uat.hair_colour as ua_hair_colour, uat.hair_type as ua_hair_type, uat.hair_colour_treated as ua_hair_colour_treated, uat.hair_colour_treated_how as ua_hair_colour_treated_how, uat.hair_concern_frizz as ua_hair_concerns_frizz, uat.hair_concern_dandruff as ua_hair_concerns_dandruff,uat.hair_concern_damage as ua_hair_concerns_damage,uat.hair_concern_coloured as ua_hair_concerns_coloured,uat.hair_concern_lack_volume as ua_hair_concerns_lack_volume, uat.hair_concern_hair_loss as ua_hair_concerns_hair_loss,uat.hair_concern_ageing_hair as ua_hair_concerns_ageing_hair, uat.hair_concern_split_ends as ua_hair_concerns_split_ends, uat.hair_concern_lack_shine as ua_hair_concerns_lack_shine, uat.hair_concern_psoriasis as ua_hair_concerns_psoriasis, uat.hair_concern_oily_scalp as ua_hair_oily_scalp, uat.hair_concern_itchy_scalp as ua_hair_concern_itchy_scalp, uat.hair_concern_heat_damaged as ua_hair_concern_heat_damaged, uat.hair_concern_thinning as ua_hair_concern_thinning, uat.hair_concern_alopecia as ua_hair_concern_alopecia, uat.hair_concern_dry_scalp as ya_hari_concern_dry_scalp, uat.hair_concern_none as ua_hair_concerns_none, uat.scents_clean as ua_scents_clean, uat.scents_floral as ua_scents_floral, uat.scents_oriental as ua_scents_oriental, uat.scents_woody as ua_scents_woody, uat.scents_citrus as ua_scents_citrus, uat.scents_fruity as ua_scents_fruity, uat.scents_green as ua_scents_green, uat.scents_oceanic as ua_scents_oceanic, uat.scents_spicy as ua_scents_spicy, uat.product_anti_ageing as ua_product_anti_ageing, uat.product_clean as ua_product_clean, uat.product_contains_aloe as ua_product_contains_aloe, uat.product_contains_caffeine as ua_product_contains_caffeine, uat.product_contains_cocoa as ua_product_contains_cocoa, uat.product_contains_retinol as ua_product_contains_retinol, uat.product_contains_shea as ua_product_contains_shea, uat.product_contains_spf as ua_product_contains_spf, uat.product_cruelty_free as ua_product_cruelty_free, uat.product_eco_friendly as ua_product_eco_friendly, uat.product_halal as ua_product_halal, uat.product_natural as ua_product_natural, uat.product_organic as ua_product_organic, uat.product_vegan_friendly as ua_product_vegan_friendly,uat.product_sustainable as ua_product_sustainable,  uat.purchasing_factor1 as ua_purchasing_factor1, uat.purchasing_factor2 as ua_purchasing_factor2, uat.purchasing_factor3 as ua_purchasing_factor3, uat.purchasing_factor4 as ua_purchasing_factor4, uat.purchasing_factor5 as ua_purchasing_factor5, uat.purchasing_factor6 as ua_purchasing_factor6, uat.purchasing_factor7 as ua_purchasing_factor7, uat.purchasing_factor8 as ua_purchasing_factor8, uat.purchasing_factor9 as ua_purchasing_factor9, uat.purchasing_factor10 as ua_purchasing_factor10, uat.try_skincare as ua_try_skincare, uat.try_haircare as ua_try_haircare, uat.try_makeup as ua_try_makeup, uat.education as ua_education, uat.employment as ua_employment, uat.under_18_in_household as ua_under_18_in_home, uat.address_one as ua_address1, uat.address_two as ua_address2, uat.city as ua_city, uat.county as ua_county, uat.postcode as ua_postcode, uat.phone_code as ua_phone_code, uat.phone_number as ua_phone_number, uat.phone_confirmed_at as ua_phone_confirmed_at from user left join profile p on user.id = p.user_id left join user_attribute uat on user.id = uat.user_id left join file_upload fu on p.profile_image_id = fu.id left join user_awards uw on user.id = uw.user_id where uw.award_id = 6;')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.log("CATCH mySql.Dao.js")
                reject(error)
            })
    })
}

//Method to pull all of a member's details
var memberDetails = function (memberID) {
    return new Promise((resolve, reject) => {
        pool.query('select user.id as user_id, user.username as username, user.email as user_email, user.country as user_country, user.birthday as user_dob, user.gender as gender, user.video_reviewer as video_reviewer, user.heard_about as heard_about, user.status as user_status, user.last_login_at as user_last_login_at, user.created_at as user_created_at, p.name as profile_name, p.surname as profile_surname, p.instagram_handle as profile_instagram_handle, p.tiktok_handle as profile_tiktok_handle, p.instagram_followers as instagram_followers, p.sharing as profile_sharing, p.attributes_privacy as profile_attributes_privacy, p.bio as profile_bio, p.profile_image_id as profile_image_id, fu.file_path as profile_image_url, p.newsletter as profile_newsletter, uat.skin_tone as ua_skin_tone, uat.skin_complexion as ua_skin_complexion, uat.sensitive_skin as ua_sensitive_skin, uat.skin_type as ua_skin_type, uat.skin_concern_fine_lines as ua_skin_concerns_fine_lines, uat.skin_concern_breakouts as ua_skin_concerns_breakouts, uat.skin_concern_large_pores as ua_skin_concerns_large_pores, uat.skin_concern_hyper_pigmentation as ua_skin_concerns_hyper_pigmentation, uat.skin_concern_uneven_tone as ua_skin_concerns_uneven_tone, uat.skin_concern_dehydration as ua_skin_concerns_dehydration, uat.skin_concern_acne as ua_skin_concerns_acne, uat.skin_concern_dull_skin as ua_skin_dull_skin, uat.skin_concern_rosacea as ua_skin_concerns_rosacea, uat.skin_concern_dark_spots as ua_skin_concerns_dark_spots, uat.skin_concern_sun_damage as ua_skin_concerns_sun_damage, uat.skin_concern_puffiness as ua_skin_concerns_puffiness, uat.skin_concern_cystic_acne as ua_skin_concerns_cystic_acne, uat.eye_colour as ua_eye_colour, uat.eye_concern_dark_circles as ua_eye_concerns_dark_circles, uat.eye_concern_lines_wrinkles as ua_eye_concerns_lines_wrinkles, uat.eye_concern_drooping_eyelids as ua_eye_concerns_drooping_eyelids, uat.eye_concern_puffiness as ua_eye_concerns_puffiness, uat.eye_concern_under_eye_hallows as ua_eye_concerns_under_eye_hallows, uat.eye_concern_none as ua_eye_concerns_none, uat.lips_concern_normal as ua_lips_concerns_normal, uat.lips_concern_dry as ua_lips_concerns_dry, uat.lips_concern_cracked as ua_lips_concerns_cracked, uat.lips_concern_cold_sores as ua_lips_concerns_cold_sores, uat.lips_concern_thin as ua_lips_concerns_thin, uat.lips_concern_chapped as ua_lips_concerns_chapped, uat.body_skin_type as ua_body_skin_type, uat.body_skin_concern_cellulite as ua_body_skin_concerns_cellulite, uat.body_skin_concern_stretch_marks as ua_body_skin_concerns_stretch_marks, uat.body_skin_concern_dehydration as ua_body_skin_concerns_dehydration, uat.body_skin_concern_menopausal as ua_body_skin_concerns_menopausal, uat.body_skin_concern_itchy_skin as ua_body_skin_concerns_itchy_skin, uat.body_skin_concern_eczema as ua_body_skin_concerns_eczema, uat.body_skin_concern_psoriasis as ua_body_skin_concerns_psoriasis,uat.body_skin_concern_vitiligo as ua_body_skin_concerns_vitiligo, uat.body_skin_concern_keratosis_pilaris as ua_body_skin_concerns_keratosis_pilaris, uat.body_skin_concern_none as ua_body_skin_concerns_none, uat.hair_structure as ua_hair_structure, uat.hair_moisture_levels as ua_moisture_levels, uat.hair_colour as ua_hair_colour, uat.hair_type as ua_hair_type, uat.hair_colour_treated as ua_hair_colour_treated, uat.hair_colour_treated_how as ua_hair_colour_treated_how, uat.hair_concern_frizz as ua_hair_concerns_frizz, uat.hair_concern_dandruff as ua_hair_concerns_dandruff,uat.hair_concern_damage as ua_hair_concerns_damage,uat.hair_concern_coloured as ua_hair_concerns_coloured,uat.hair_concern_lack_volume as ua_hair_concerns_lack_volume, uat.hair_concern_hair_loss as ua_hair_concerns_hair_loss,uat.hair_concern_ageing_hair as ua_hair_concerns_ageing_hair, uat.hair_concern_split_ends as ua_hair_concerns_split_ends, uat.hair_concern_lack_shine as ua_hair_concerns_lack_shine, uat.hair_concern_psoriasis as ua_hair_concerns_psoriasis, uat.hair_concern_oily_scalp as ua_hair_oily_scalp, uat.hair_concern_itchy_scalp as ua_hair_concern_itchy_scalp, uat.hair_concern_heat_damaged as ua_hair_concern_heat_damaged, uat.hair_concern_thinning as ua_hair_concern_thinning, uat.hair_concern_alopecia as ua_hair_concern_alopecia, uat.hair_concern_dry_scalp as ya_hari_concern_dry_scalp, uat.hair_concern_none as ua_hair_concerns_none, uat.scents_clean as ua_scents_clean, uat.scents_floral as ua_scents_floral, uat.scents_oriental as ua_scents_oriental, uat.scents_woody as ua_scents_woody, uat.scents_citrus as ua_scents_citrus, uat.scents_fruity as ua_scents_fruity, uat.scents_green as ua_scents_green, uat.scents_oceanic as ua_scents_oceanic, uat.scents_spicy as ua_scents_spicy, uat.product_anti_ageing as ua_product_anti_ageing, uat.product_clean as ua_product_clean, uat.product_contains_aloe as ua_product_contains_aloe, uat.product_contains_caffeine as ua_product_contains_caffeine, uat.product_contains_cocoa as ua_product_contains_cocoa, uat.product_contains_retinol as ua_product_contains_retinol, uat.product_contains_shea as ua_product_contains_shea, uat.product_contains_spf as ua_product_contains_spf, uat.product_cruelty_free as ua_product_cruelty_free, uat.product_eco_friendly as ua_product_eco_friendly, uat.product_halal as ua_product_halal, uat.product_natural as ua_product_natural, uat.product_organic as ua_product_organic, uat.product_vegan_friendly as ua_product_vegan_friendly,uat.product_sustainable as ua_product_sustainable,  uat.purchasing_factor1 as ua_purchasing_factor1, uat.purchasing_factor2 as ua_purchasing_factor2, uat.purchasing_factor3 as ua_purchasing_factor3, uat.purchasing_factor4 as ua_purchasing_factor4, uat.purchasing_factor5 as ua_purchasing_factor5, uat.purchasing_factor6 as ua_purchasing_factor6, uat.purchasing_factor7 as ua_purchasing_factor7, uat.purchasing_factor8 as ua_purchasing_factor8, uat.purchasing_factor9 as ua_purchasing_factor9, uat.purchasing_factor10 as ua_purchasing_factor10, uat.try_skincare as ua_try_skincare, uat.try_haircare as ua_try_haircare, uat.try_makeup as ua_try_makeup, uat.education as ua_education, uat.employment as ua_employment, uat.under_18_in_household as ua_under_18_in_home, uat.address_one as ua_address1, uat.address_two as ua_address2, uat.city as ua_city, uat.county as ua_county, uat.postcode as ua_postcode, uat.phone_code as ua_phone_code, uat.phone_number as ua_phone_number, uat.phone_confirmed_at as ua_phone_confirmed_at from user left join profile p on user.id = p.user_id left join user_attribute uat on user.id = uat.user_id left join file_upload fu on p.profile_image_id = fu.id left join user_awards uw on user.id = uw.user_id where user.id = ?;', [memberID])
            .then((data) => {
                resolve(data[0]);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

//Method to update a member's details
var updateMember = function(userId, updatedData) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE user u
            LEFT JOIN profile p ON u.id = p.user_id
            left join file_upload fu on p.profile_image_id = fu.id
            LEFT JOIN user_attribute uat ON u.id = uat.user_id
            SET u.username = ?, u.email = ?, u.country = ?, u.birthday = ?, u.gender = ?, u.video_reviewer = ?, u.heard_about = ?, u.status = ?, u.last_login_at = ?, p.name = ?, p.surname = ?, p.instagram_handle = ?, p.tiktok_handle = ?, p.instagram_followers = ?, p.sharing = ?, p.attributes_privacy = ?, p.bio = ?, p.profile_image_id = ?, fu.file_path = ? , p.newsletter = ?, uat.skin_tone = ?, uat.skin_complexion = ?, uat.sensitive_skin = ?, uat.skin_type = ?, uat.skin_concern_fine_lines = ?, uat.skin_concern_breakouts = ?, uat.skin_concern_large_pores = ?, uat.skin_concern_hyper_pigmentation = ?, uat.skin_concern_uneven_tone = ?, uat.skin_concern_dehydration = ?, uat.skin_concern_acne = ?, uat.skin_concern_dull_skin = ?, uat.skin_concern_rosacea = ?, uat.skin_concern_dark_spots = ?, uat.skin_concern_sun_damage = ?, uat.skin_concern_puffiness = ?, uat.skin_concern_cystic_acne = ?, uat.eye_colour = ?, uat.eye_concern_dark_circles = ?, uat.eye_concern_lines_wrinkles = ?, uat.eye_concern_drooping_eyelids = ?, uat.eye_concern_puffiness = ?, uat.eye_concern_under_eye_hallows = ?, uat.eye_concern_none = ?, uat.lips_concern_normal = ?, uat.lips_concern_dry = ?, uat.lips_concern_cracked = ?, uat.lips_concern_cold_sores = ?, uat.lips_concern_thin = ?, uat.lips_concern_chapped = ?, uat.body_skin_type = ?, uat.body_skin_concern_cellulite = ?, uat.body_skin_concern_stretch_marks = ?, uat.body_skin_concern_dehydration = ?, uat.body_skin_concern_menopausal = ?, uat.body_skin_concern_itchy_skin = ?, uat.body_skin_concern_eczema = ?, uat.body_skin_concern_psoriasis = ?, uat.body_skin_concern_vitiligo = ?, uat.body_skin_concern_keratosis_pilaris = ?, uat.body_skin_concern_none = ?, uat.hair_structure = ?, uat.hair_moisture_levels = ?, uat.hair_colour = ?, uat.hair_type = ?, uat.hair_colour_treated = ?, uat.hair_colour_treated_how = ?, uat.hair_concern_frizz = ?, uat.hair_concern_dandruff = ?, uat.hair_concern_damage = ?, uat.hair_concern_coloured = ?, uat.hair_concern_lack_volume = ?, uat.hair_concern_hair_loss = ?, uat.hair_concern_ageing_hair = ?, uat.hair_concern_split_ends = ?, uat.hair_concern_lack_shine = ?, uat.hair_concern_psoriasis = ?, uat.hair_concern_oily_scalp = ?, uat.hair_concern_itchy_scalp = ?, uat.hair_concern_heat_damaged = ?, uat.hair_concern_thinning = ?, uat.hair_concern_alopecia = ?, uat.hair_concern_dry_scalp = ?, uat.hair_concern_none = ?, uat.scents_clean = ?, uat.scents_floral = ?, uat.scents_oriental = ?, uat.scents_woody = ?, uat.scents_citrus = ?, uat.scents_fruity = ?, uat.scents_green = ?, uat.scents_oceanic = ?, uat.scents_spicy = ?, uat.product_anti_ageing = ?, uat.product_clean = ?, uat.product_contains_aloe = ?, uat.product_contains_caffeine = ?, uat.product_contains_cocoa = ?, uat.product_contains_retinol = ?, uat.product_contains_shea = ?, uat.product_contains_spf = ?, uat.product_cruelty_free = ?, uat.product_eco_friendly = ?, uat.product_halal = ?, uat.product_natural = ?, uat.product_organic = ?, uat.product_vegan_friendly = ?, uat.product_sustainable = ?, uat.purchasing_factor1 = ?, uat.purchasing_factor2 = ?, uat.purchasing_factor3 = ?, uat.purchasing_factor4 = ?, uat.purchasing_factor5 = ?, uat.purchasing_factor6 = ?, uat.purchasing_factor7 = ?, uat.purchasing_factor8 = ?, uat.purchasing_factor9 = ?, uat.purchasing_factor10 = ?, uat.try_skincare = ?, uat.try_haircare = ?, uat.try_makeup = ?, uat.education = ?, uat.employment = ?, uat.under_18_in_household = ?, uat.address_one = ?, uat.address_two = ?, uat.city = ?, uat.county = ?, uat.postcode = ?, uat.phone_code = ?, uat.phone_number = ?, uat.phone_confirmed_at = ? WHERE u.id = ?;
        `;
        const values = [
            updatedData.username, updatedData.email, updatedData.country, updatedData.dob, updatedData.gender, updatedData.vide_rev, updatedData.heard, updatedData.status, updatedData.lastLog, updatedData.fname, updatedData.sname, updatedData.instHand, updatedData.tikHand, updatedData.instFol, updatedData.profShar, updatedData.profAtts, updatedData.profBio, updatedData.profImgId, updatedData.profImgUrl, updatedData.profNews, updatedData.skinTone, updatedData.complex, updatedData.sensSkin, updatedData.skinType, updatedData.skinLin, updatedData.skinBreak, updatedData.lPore, updatedData.hypPig, updatedData.unevTone, updatedData.dehyd, updatedData.acne, updatedData.dullSkin, updatedData.rosa, updatedData.darkSpots, updatedData.sunDam, updatedData.puffy, updatedData.cysAcne, updatedData.eyeCol, updatedData.eyeDark, updatedData.eyeLines, updatedData.eyeDroop, updatedData.eyePuffy, updatedData.eyeHollows, updatedData.eyeNone, updatedData.lipsNormal, updatedData.lipsDry, updatedData.lipsCracked, updatedData.lipsColdSores, updatedData.lipsThin, updatedData.lipsChapped, updatedData.bodySkinType, updatedData.bodyCellulite, updatedData.bodyStretchMarks, updatedData.bodyDehydration, updatedData.bodyMenopausal, updatedData.bodyItchySkin, updatedData.bodyEczema, updatedData.bodyPsoriasis, updatedData.bodyVitiligo, updatedData.bodyKeratosisPilaris, updatedData.bodyNone, updatedData.hairStruct, updatedData.moistLvl, updatedData.hairCol, updatedData.hairType, updatedData.hairColTreat, updatedData.hairColTreatHow, updatedData.hairFrizz, updatedData.hairDandruff, updatedData.hairDamage, updatedData.hairColoured, updatedData.hairLackVolume, updatedData.hairLoss, updatedData.hairAgeing, updatedData.hairSplitEnds, updatedData.hairLackShine, updatedData.hairPsoriasis, updatedData.hairOilyScalp, updatedData.hairItchyScalp, updatedData.hairHeatDamaged, updatedData.hairThining, updatedData.hairAlopecia, updatedData.hairDryScalp, updatedData.hairNone, updatedData.scentsClean, updatedData.scentsFloral, updatedData.scentsOriental, updatedData.scentsWoody, updatedData.scentsCitrus, updatedData.scentsFruity, updatedData.scentsGreen, updatedData.scentsOceanic, updatedData.scentsSpicy, updatedData.productAntiAgeing, updatedData.productClean, updatedData.productContainsAloe, updatedData.productContainsCaffeine, updatedData.productContainsCocoa, updatedData.productContainsRetinol, updatedData.productContainsShea, updatedData.productContainsSpf, updatedData.productCrueltyFree, updatedData.productEcoFriendly, updatedData.productHalal, updatedData.productNatural, updatedData.productOrganic, updatedData.productVeganFriendly, updatedData.productSustainable, updatedData.purFact1, updatedData.purFact2, updatedData.purFact3, updatedData.purFact4, updatedData.purFact5, updatedData.purFact6, updatedData.purFact7, updatedData.purFact8, updatedData.purFact9, updatedData.purFact10, updatedData.trySkin, updatedData.tryHair, updatedData.tryMake, updatedData.edu, updatedData.emp, updatedData.un18, updatedData.add1, updatedData.add2, updatedData.city, updatedData.county, updatedData.postcode, updatedData.phoneCode, updatedData.phoneNum, updatedData.phoneConfAt, userId
        ];

        pool.query(query, values)
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
    });
};

//Getting the surface level details for a campaign, will be used for navigation to a later page
var getValidCamps = function () {
    return new Promise((resolve, reject) => {
        pool.query(`select id as camp_id, campaign_ref as sampling_campaign_ref, posted_date from sampling_campaigns where posted_date > CURRENT_DATE();`)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.log("CATCH mySql.Dao.js")
                reject(error)
            })
    })
}

//PROBABLY REMOVE THIS ONE EOIN - RIGHT NOW ITS DOING NOTHING
var getCampDetails = function (campaignId) {
    //Command to get the campaings and their specific info
    return new Promise((resolve, reject) => {
        pool.query(`SELECT 
            samcap.id AS campaign_id,
            samcap.product_id AS product_id,
            samcap.product_variant_id AS SamCap_Product_var_id,
            samcap.posted_date AS Campaign_posted_at,
            samcap.campaign_ref AS campaign_name,
            samcap.product_id AS sampling_product_id,
            samcap.no_of_samples AS sampling_no_of_samples,
            samcap.posted_date AS sampling_posted_date,
            samint.campaign_ref AS sampling_campaign_ref,
            samint.status AS campaign_status,
            samint.video_content AS user_lef_video_content,
            ua.attribute_name AS attribute_name,
            ua.attribute_value AS attribute_value
            FROM sampling_campaigns samcap
            LEFT JOIN sampler_interactions samint ON samcap.id = samint.campaign_ref
            LEFT JOIN user_attributes ua ON samint.user_id = ua.user_id
            WHERE samcap.id = ?;`, campaignId)
            .then((data) => {
                resolve(data[0]);
            })
            .catch((error) => {
                console.log("CATCH mySql.Dao.js")
                reject(error)
            })
    })
}

//Getting a specific campaign & its details as opposed to a specific 
var getCampaignParticipants = function (campaignId) {
    return new Promise((resolve, reject) => {
        pool.query(`WITH AllRecords AS (
    SELECT 
        user.id AS user_id,
        uw.award_id AS Sampler_Badge,
        samcap.id AS Campaign_id,
        samcap.product_id AS Campaign_p_id,
        pv.product_id AS review_product_id,
        pr.id AS Product_id,
        pr.title AS product_title,
        samcap.product_variant_id AS SamCap_Product_var_id,
        r.product_variant_id AS Review_product_variant_id,
        r.id AS review_id,
        r.title AS review_title,
        r.description AS review_description,
        r.rating AS review_rating,
        r.recommend_product AS will_recommend,
        r.repurchase_product AS will_repurchase,
        hpa.name AS how_did_get_product,
        r.link1 AS social_media_content_link1,
        r.link2 AS social_media_content_link2,
        r.link3 AS social_media_content_link3,
        r.link4 AS social_media_content_link4,
        r.link5 AS social_media_content_link5,
        r.created_at AS review_created_at,
        rs.sentiment AS review_sentiment,
        rs.sentiment_score_positive AS review_sentiment_score_positive,
        rs.sentiment_score_negative AS review_sentiment_score_negative,
        rs.sentiment_score_neutral AS review_sentiment_score_neutral,
        rs.sentiment_score_mixed AS review_sentiment_score_mixed,
        samcap.posted_date AS Campaign_posted_at,
        samint.campaign_ref AS sampling_campaign_ref,
        samint.status AS campaign_status,
        samcap.campaign_ref AS campaign_name,
        samcap.product_id AS sampling_product_id,
        samcap.no_of_samples AS sampling_no_of_samples,
        samcap.posted_date AS sampling_posted_date,
        samint.video_content AS user_lef_video_content,
        user.username AS username,
        p.name AS profile_name,
        p.surname AS profile_surname,
        p.instagram_handle AS instagram_handle,
        p.instagram_followers AS instagram_followers,
        p.tiktok_handle AS tiktok_handle,
        p.tiktok_followers AS tiktok_followers,
        CONCAT('https://cdn.thebeautybuddy.com/video/', rv.video_id, '/MP4/', rv.video_id, '_720.mp4') AS video_url,
        video.upload_note AS video_status,
        video.deleted AS review_video_deleted,
        video.id AS review_video_id,
        video.created_at AS review_video_created_at,
        user.email AS user_email,
        user.country AS user_country,
        user.birthday AS user_dob,
        user.gender AS gender,
        user.last_login_at AS user_last_login_at,
        user.created_at AS user_created_at,
        p.newsletter AS profile_newsletter,
        p.profile_image_id AS profile_image_id,
        fup.file_path AS profile_image_url,
        fu.file_path AS product_image_url,
        uat.skin_tone AS ua_skin_tone
    FROM user
    LEFT JOIN profile p ON user.id = p.user_id
    LEFT JOIN user_attribute uat ON user.id = uat.user_id
    LEFT JOIN review r ON user.id = r.user_id
    LEFT JOIN review_sentiment rs ON r.id = rs.review_id
    LEFT JOIN review_video rv ON r.id = rv.review_id
    LEFT JOIN video video ON video.id = rv.video_id
    LEFT JOIN user_awards uw ON user.id = uw.user_id
    LEFT JOIN product_variant pv ON r.product_variant_id = pv.id
    LEFT JOIN product pr ON pv.product_id = pr.id
    LEFT JOIN brand br ON pr.brand_id = br.id
    LEFT JOIN sampler_interactions samint ON user.id = samint.user_id
    LEFT JOIN sampling_campaigns samcap ON samint.campaign_ref = samcap.id
    LEFT JOIN (
        SELECT ptfu1.product_id, ptfu1.file_upload_id
        FROM product_to_file_upload ptfu1
        WHERE ptfu1.id = (
            SELECT MAX(ptfu2.id)
            FROM product_to_file_upload ptfu2
            WHERE ptfu2.product_id = ptfu1.product_id
        )
    ) ptfu ON pv.id = ptfu.product_id
    LEFT JOIN file_upload fu ON ptfu.file_upload_id = fu.id AND fu.file_upload_category_id = 1
    LEFT JOIN file_upload fup ON p.profile_image_id = fup.id
    LEFT JOIN how_product_acquired hpa ON r.how_did_get_product = hpa.id
    WHERE samcap.product_id = pr.id
    AND uw.award_id = '6'
    AND r.deleted = "0"
    AND samcap.id = ?
),
RankedVideos AS (
    SELECT *,
           ROW_NUMBER() OVER (
               PARTITION BY user_id
               ORDER BY 
                   CASE WHEN review_video_created_at IS NULL THEN 0 ELSE 1 END, 
                   review_video_created_at DESC
           ) AS rn
    FROM AllRecords
)
SELECT * 
FROM RankedVideos 
WHERE video_status = "Success"  
   OR (review_video_created_at IS NULL)  
   OR (video_status IS NULL AND rn = 1);`, campaignId)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.log("CATCH mySql.Dao.js")
                reject(error)
            })
    })
}

var getEligibleMembers = function () {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT u.id, u.username, u.email, ua.attribute_name, ua.attribute_value
            FROM user u
            JOIN user_attributes ua ON u.id = ua.user_id
            JOIN awards a ON u.id = a.id
            LEFT JOIN audience aud ON u.id = aud.id
            WHERE a.id = 6
            AND aud.id IS NULL;`)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.log("CATCH mySql.Dao.js")
                reject(error)
            })
    });
}

module.exports = { getMembers, memberDetails, getCampDetails, getValidCamps, getCampaignParticipants, updateMember, getEligibleMembers, login };