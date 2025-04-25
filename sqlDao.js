//This data access object will enable interaction with the sql in the actual database
var mysql = require("promise-mysql");
var pool;

//Creating a pool of connections for this program

var login = function (hostname, username, password, database) {
    return new Promise((resolve, reject) => {
        mysql.createPool({
            connectionLimit: 20,
            host: hostname,
            user: username,
            password: password,
            database: database,
            waitForConnections: true,
            queueLimit: 0
        })
        .then((p) => {
            pool = p;
            resolve("Connected to database");
        })
        .catch((e) => {
            console.log("Connection failed:", e); // Debugging log
            reject(e); // Ensures error reaches index.js
        });
    });
};

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

//Method to pull all of a member's details
var getCampMemberDetails = function (memberID) {
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

var updateAudienceMemberDetails = function (userId, updatedData) {
    return new Promise((resolve, reject) => {
        pool.query(`
            UPDATE sampler_interactions samint
            LEFT JOIN user u ON u.id = samint.user_id
            LEFT JOIN review rev ON rev.user_id = u.id
            LEFT JOIN review_sentiment revsent ON rev.id = revsent.review_id
            SET 
                revsent.sentiment = ?,
                revsent.sentiment_score_positive = ?,
                revsent.sentiment_score_negative = ?,
                revsent.sentiment_score_neutral = ?,
                revsent.sentiment_score_mixed = ?,
                samint.status = ?,
                samint.comment = ?,
                samint.include_again = ?,
                samint.product_demonstrated = ?,
                samint.consumer_on_camera = ?,
                samint.voiceover = ?,
                samint.live_talking_to_camera = ?,
                samint.captions = ?,
                samint.informative_written_review = ?,
                samint.watermarks = ?,
                samint.short_video_on_repeat = ?,
                samint.just_photos_in_video = ?,
                samint.unboxing_video_only = ?,
                samint.distracting_transitions = ?,
                samint.missed_completion_date = ?
            WHERE samint.user_id = ?;`, [
                updatedData.overallSentiment,
                updatedData.reviewscorepositive,
                updatedData.reviewscorenegative,
                updatedData.reviewscoreneutral,
                updatedData.reviewscoremixed,
                updatedData.interactionStatus,
                updatedData.interactionComment,
                updatedData.interactionIncludeAgain,
                updatedData.interactionProductDemonstrated ? 1 : 0,
                updatedData.interactionConsumerOnCamera ? 1 : 0,
                updatedData.interactionVoiceover ? 1 : 0,
                updatedData.interactionLiveTalkingToCamera ? 1 : 0,
                updatedData.interactionCaptions ? 1 : 0,
                updatedData.interactionInformativeWrittenReview ? 1 : 0,
                updatedData.interactionWatermarks ? 1 : 0,
                updatedData.interactionShortVideoOnRepeat ? 1 : 0,
                updatedData.interactionJustPhotosInVideo ? 1 : 0,
                updatedData.interactionUnboxingVideoOnly ? 1 : 0,
                updatedData.interactionDistractingTransitions ? 1 : 0,
                updatedData.interactionMissedCompletionDate ? 1 : 0,
                userId
            ])
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
};

var getCampDetails = function (campaignId) {
    //Command to get the campaings and their specific info
    return new Promise((resolve, reject) => {
        pool.query(`SELECT 
            samcap.id AS campaign_id,
            samcap.product_id AS product_id,
            samcap.audience_id AS audience_id,
            samcap.product_variant_id AS SamCap_Product_var_id,
            samcap.posted_date AS Campaign_posted_at,
            samcap.campaign_ref AS campaign_name,
            samcap.product_id AS sampling_product_id,
            samcap.no_of_samples AS sampling_no_of_samples,
            samcap.posted_date AS sampling_posted_date,
            samint.campaign_ref AS sampling_campaign_ref,
            samint.status AS campaign_status,
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
        const query = `
            SELECT 
                user.id AS user_id,
                user.username AS username,
                user.email AS user_email,
                user.country AS user_country,
                user.birthday AS user_dob,
                user.gender AS gender,
                user.video_reviewer AS video_reviewer,
                user.heard_about AS heard_about,
                user.status AS user_status,
                user.last_login_at AS user_last_login_at,
                user.created_at AS user_created_at,
                p.name AS profile_name,
                p.surname AS profile_surname,
                p.instagram_handle AS profile_instagram_handle,
                p.tiktok_handle AS profile_tiktok_handle,
                p.instagram_followers AS instagram_followers,
                p.sharing AS profile_sharing,
                p.attributes_privacy AS profile_attributes_privacy,
                p.bio AS profile_bio,
                p.profile_image_id AS profile_image_id,
                fu.file_path AS profile_image_url,
                p.newsletter AS profile_newsletter,
                uat.skin_tone AS ua_skin_tone,
                uat.skin_complexion AS ua_skin_complexion,
                uat.sensitive_skin AS ua_sensitive_skin,
                uat.skin_type AS ua_skin_type,
                uat.skin_concern_fine_lines AS ua_skin_concerns_fine_lines,
                uat.skin_concern_breakouts AS ua_skin_concerns_breakouts,
                uat.skin_concern_large_pores AS ua_skin_concerns_large_pores,
                uat.skin_concern_hyper_pigmentation AS ua_skin_concerns_hyper_pigmentation,
                uat.skin_concern_uneven_tone AS ua_skin_concerns_uneven_tone,
                uat.skin_concern_dehydration AS ua_skin_concerns_dehydration,
                uat.skin_concern_acne AS ua_skin_concerns_acne,
                uat.skin_concern_dull_skin AS ua_skin_dull_skin,
                uat.skin_concern_rosacea AS ua_skin_concerns_rosacea,
                uat.skin_concern_dark_spots AS ua_skin_concerns_dark_spots,
                uat.skin_concern_sun_damage AS ua_skin_concerns_sun_damage,
                uat.skin_concern_puffiness AS ua_skin_concerns_puffiness,
                uat.skin_concern_cystic_acne AS ua_skin_concerns_cystic_acne,
                uat.eye_colour AS ua_eye_colour,
                uat.eye_concern_dark_circles AS ua_eye_concerns_dark_circles,
                uat.eye_concern_lines_wrinkles AS ua_eye_concerns_lines_wrinkles,
                uat.eye_concern_drooping_eyelids AS ua_eye_concerns_drooping_eyelids,
                uat.eye_concern_puffiness AS ua_eye_concerns_puffiness,
                uat.eye_concern_under_eye_hallows AS ua_eye_concerns_under_eye_hallows,
                uat.eye_concern_none AS ua_eye_concerns_none,
                uat.lips_concern_normal AS ua_lips_concerns_normal,
                uat.lips_concern_dry AS ua_lips_concerns_dry,
                uat.lips_concern_cracked AS ua_lips_concerns_cracked,
                uat.lips_concern_cold_sores AS ua_lips_concerns_cold_sores,
                uat.lips_concern_thin AS ua_lips_concerns_thin,
                uat.lips_concern_chapped AS ua_lips_concerns_chapped,
                uat.body_skin_type AS ua_body_skin_type,
                uat.body_skin_concern_cellulite AS ua_body_skin_concerns_cellulite,
                uat.body_skin_concern_stretch_marks AS ua_body_skin_concerns_stretch_marks,
                uat.body_skin_concern_dehydration AS ua_body_skin_concerns_dehydration,
                uat.body_skin_concern_menopausal AS ua_body_skin_concerns_menopausal,
                uat.body_skin_concern_itchy_skin AS ua_body_skin_concerns_itchy_skin,
                uat.body_skin_concern_eczema AS ua_body_skin_concerns_eczema,
                uat.body_skin_concern_psoriasis AS ua_body_skin_concerns_psoriasis,
                uat.body_skin_concern_vitiligo AS ua_body_skin_concerns_vitiligo,
                uat.body_skin_concern_keratosis_pilaris AS ua_body_skin_concerns_keratosis_pilaris,
                uat.body_skin_concern_none AS ua_body_skin_concerns_none,
                uat.hair_structure AS ua_hair_structure,
                uat.hair_moisture_levels AS ua_hair_moisture_levels,
                uat.hair_colour AS ua_hair_colour,
                uat.hair_type AS ua_hair_type,
                uat.hair_colour_treated AS ua_hair_colour_treated,
                uat.hair_colour_treated_how AS ua_hair_colour_treated_how,
                uat.hair_concern_frizz AS ua_hair_concerns_frizz,
                uat.hair_concern_dandruff AS ua_hair_concerns_dandruff,
                uat.hair_concern_damage AS ua_hair_concerns_damage,
                uat.hair_concern_coloured AS ua_hair_concerns_coloured,
                uat.hair_concern_lack_volume AS ua_hair_concerns_lack_volume,
                uat.hair_concern_hair_loss AS ua_hair_concerns_hair_loss,
                uat.hair_concern_ageing_hair AS ua_hair_concerns_ageing_hair,
                uat.hair_concern_split_ends AS ua_hair_concerns_split_ends,
                uat.hair_concern_lack_shine AS ua_hair_concerns_lack_shine,
                uat.hair_concern_psoriasis AS ua_hair_concerns_psoriasis,
                uat.hair_concern_oily_scalp AS ua_hair_oily_scalp,
                uat.hair_concern_itchy_scalp AS ua_hair_concern_itchy_scalp,
                uat.hair_concern_heat_damaged AS ua_hair_concern_heat_damaged,
                uat.hair_concern_thinning AS ua_hair_concern_thinning,
                uat.hair_concern_alopecia AS ua_hair_concern_alopecia,
                uat.hair_concern_dry_scalp AS ua_hair_concern_dry_scalp,
                uat.hair_concern_none AS ua_hair_concerns_none,
                uat.scents_clean AS ua_scents_clean,
                uat.scents_floral AS ua_scents_floral,
                uat.scents_oriental AS ua_scents_oriental,
                uat.scents_woody AS ua_scents_woody,
                uat.scents_citrus AS ua_scents_citrus,
                uat.scents_fruity AS ua_scents_fruity,
                uat.scents_green AS ua_scents_green,
                uat.scents_oceanic AS ua_scents_oceanic,
                uat.scents_spicy AS ua_scents_spicy,
                uat.product_anti_ageing AS ua_product_anti_ageing,
                uat.product_clean AS ua_product_clean,
                uat.product_contains_aloe AS ua_product_contains_aloe,
                uat.product_contains_caffeine AS ua_product_contains_caffeine,
                uat.product_contains_cocoa AS ua_product_contains_cocoa,
                uat.product_contains_retinol AS ua_product_contains_retinol,
                uat.product_contains_shea AS ua_product_contains_shea,
                uat.product_contains_spf AS ua_product_contains_spf,
                uat.product_cruelty_free AS ua_product_cruelty_free,
                uat.product_eco_friendly AS ua_product_eco_friendly,
                uat.product_halal AS ua_product_halal,
                uat.product_natural AS ua_product_natural,
                uat.product_organic AS ua_product_organic,
                uat.product_vegan_friendly AS ua_product_vegan_friendly,
                uat.product_sustainable AS ua_product_sustainable,
                rev.title AS review_title,
                rev.description AS review_description,
                rev.rating AS review_rating,
                rev.status AS review_status,
                rev.created_at AS review_created_at,
                rev.updated_at AS review_updated_at,
                rev.like_count AS review_like_count,
                rev.comment_count AS review_comment_count,
                rev.progress AS review_progress,
                rev.recommend_product AS review_recommend_product,
                rev.repurchase_product AS review_repurchase_product,
                rev.link1 AS social_media_link1,
                rev.link2 AS social_media_link2,
                rev.link3 AS social_media_link3,
                rev.link4 AS social_media_link4,
                rev.link5 AS social_media_link5,
                rev.how_did_get_product AS review_how_did_get_product,
                revsent.sentiment AS review_sentiment,
                revsent.sentiment_score_positive AS review_sentiment_score_positive,
                revsent.sentiment_score_negative AS review_sentiment_score_negative,
                revsent.sentiment_score_neutral AS review_sentiment_score_neutral,
                revsent.sentiment_score_mixed AS review_sentiment_score_mixed,
                concat('https://cdn.thebeautybuddy.com/video/', rv.video_id, '/MP4/', rv.video_id, '_720.mp4') AS video_url,
                video.upload_note AS video_status,
                video.deleted AS review_video_deleted,
                video.id AS review_video_id,
                video.created_at AS review_video_created_at,
                samint.status AS status,
                samint.comment AS comment,
                samint.updated_at AS interaction_updated_at,
                samint.created_at AS interaction_created_at,
                samint.social_media_content AS interaction_social_media_content,
                samint.comment AS interaction_comment,
                samint.include_again AS interaction_include_again,
                samint.product_demonstrated AS interaction_product_demonstrated,
                samint.consumer_on_camera AS interaction_consumer_on_camera,
                samint.voiceover AS interaction_voiceover,
                samint.live_talking_to_camera AS interaction_live_talking_to_camera,
                samint.captions AS interaction_captions,
                samint.informative_written_review AS interaction_informative_written_review,
                samint.watermarks AS interaction_watermarks,
                samint.short_video_on_repeat AS interaction_short_video_on_repeat,
                samint.just_photos_in_video AS interaction_just_photos_in_video,
                samint.unboxing_video_only AS interaction_unboxing_video_only,
                samint.distracting_transitions AS interaction_distracting_transitions,
                samint.missed_completion_date AS interaction_missed_completion_date
            FROM user
            LEFT JOIN profile p ON user.id = p.user_id
            LEFT JOIN user_attribute uat ON user.id = uat.user_id
            LEFT JOIN file_upload fu ON p.profile_image_id = fu.id
            LEFT JOIN user_audience ua ON user.id = ua.user_id
            LEFT JOIN review rev ON rev.user_id = user.id AND rev.product_variant_id = (
                SELECT product_variant_id
                FROM sampling_campaigns
                WHERE id = ?
            )
            LEFT JOIN review_sentiment revsent ON rev.id = revsent.review_id
            LEFT JOIN review_video rv ON rev.id = rv.review_id
            LEFT JOIN video video ON rv.video_id = video.id
            LEFT JOIN sampler_interactions samint ON samint.user_id = user.id AND samint.campaign_ref = ?
            WHERE ua.audience_id = (
                SELECT audience_id
                FROM sampling_campaigns
                WHERE id = ?
            )
        `;
        pool.query(query, [campaignId, campaignId, campaignId])
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

var addMemberToCampaign = function (campaignId, audienceId, userId) {
    return new Promise((resolve, reject) => {
        let query;
        let values;

        if (audienceId) {
            // If audience_id is provided, use it directly
            query = `
                INSERT INTO user_audience (user_id, audience_id)
                VALUES (?, ?)
            `;
            values = [userId, audienceId];
        } else {
            // If audience_id is not provided, derive it using campaign_id
            query = `
                INSERT INTO user_audience (user_id, audience_id)
                SELECT ?, sc.audience_id
                FROM sampling_campaigns sc
                WHERE sc.campaign_ref = ?
            `;
            values = [userId, campaignId];
        }

        pool.query(query, values)
            .then((result) => {
                console.log("Member added to campaign:", result.affectedRows);
                resolve("Member added to campaign successfully.");
            })
            .catch((error) => {
                console.error("Error adding member to campaign:", error);
                reject(error);
            });
    });
};

var removeMemberFromCampaign = function (campaignId, audienceId, userId) {
    return new Promise((resolve, reject) => {
        let query;
        let values;

        if (audienceId) {
            // If audience_id is provided, use it directly
            query = `
                DELETE FROM user_audience
                WHERE user_id = ? AND audience_id = ?
            `;
            values = [userId, audienceId];
        } else {
            // If audience_id is not provided, derive it using campaign_id
            query = `
                DELETE ua
                FROM user_audience ua
                INNER JOIN sampling_campaigns sc ON ua.audience_id = sc.audience_id
                WHERE ua.user_id = ? AND sc.campaign_ref = ?
            `;
            values = [userId, campaignId];
        }

        pool.query(query, values)
            .then((result) => {
                console.log("Member removed from campaign:", result.affectedRows);
                resolve("Member removed from campaign successfully.");
            })
            .catch((error) => {
                console.error("Error removing member from campaign:", error);
                reject(error);
            });
    });
};

var filterEligibleMembers = function (campaignId, filters) {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                u.id AS user_id,
                u.username AS username,
                u.email AS user_email,
                u.country AS user_country,
                uat.skin_tone AS ua_skin_tone,
                uat.skin_type AS ua_skin_type,
                uat.eye_colour AS ua_eye_colour,
                p.instagram_handle AS instagram_handle,
                p.tiktok_handle AS tiktok_handle,
                (SELECT MAX(rev.created_at) FROM review rev WHERE rev.user_id = u.id) AS latest_review_date,
                (SELECT MAX(samint.created_at) FROM sampler_interactions samint WHERE samint.user_id = u.id) AS latest_campaign_date,
                (SELECT COUNT(*) FROM sampler_interactions samint WHERE samint.user_id = u.id) AS total_campaigns,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.status = 'COMPLETE') AS status_complete_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.status = 'IN_PROGRESS') AS status_in_progress_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.status = 'INCOMPLETE') AS status_incomplete_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'Yes, Definitely') AS include_again_yes_definitely_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'Yes') AS include_again_yes_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'Maybe') AS include_again_maybe_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'No') AS include_again_no_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again IS NULL) AS include_again_null_count
            FROM user u
            LEFT JOIN user_attribute uat ON u.id = uat.user_id
            LEFT JOIN profile p ON u.id = p.user_id
            WHERE u.id NOT IN (
                SELECT ua.user_id
                FROM user_audience ua
                INNER JOIN sampling_campaigns sc ON ua.audience_id = sc.audience_id
                WHERE sc.id = ?
            )
        `;
        const values = [campaignId];

        // Filter by Member ID
        if (filters.memID) {
            query += " AND u.id = ?";
            values.push(filters.memID);
        }

        // Filter by Country
        if (filters.country) {
            query += " AND u.country = ?";
            values.push(filters.country);
        }

        // Filter by Age Range
        if (filters.ageRange) {
            const [minAge, maxAge] = filters.ageRange.split("-").map(Number);
            if (!isNaN(minAge) && !isNaN(maxAge)) {
                query += " AND TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) BETWEEN ? AND ?";
                values.push(minAge, maxAge);
            } else {
                console.warn("Invalid age range format:", filters.ageRange);
            }
        }

        // Handle multiple selections for skin tone
        if (filters.skinTone && filters.skinTone.length > 0) {
            const skinToneConditions = filters.skinTone.map(() => `uat.skin_tone = ?`).join(" OR ");
            query += ` AND (${skinToneConditions})`;
            values.push(...filters.skinTone);
        }

        // Handle multiple selections for skin type
        if (filters.skinType && filters.skinType.length > 0) {
            const skinTypeConditions = filters.skinType.map(() => `uat.skin_type = ?`).join(" OR ");
            query += ` AND (${skinTypeConditions})`;
            values.push(...filters.skinType);
        }

        // Handle multiple selections for eye color
        if (filters.eyeColour && filters.eyeColour.length > 0) {
            const eyeColourConditions = filters.eyeColour.map(() => `uat.eye_colour = ?`).join(" OR ");
            query += ` AND (${eyeColourConditions})`;
            values.push(...filters.eyeColour);
        }

        // Handle multiple selections for hair type
        if (filters.hairType && filters.hairType.length > 0) {
            const hairTypeConditions = filters.hairType.map(() => `uat.hair_type = ?`).join(" OR ");
            query += ` AND (${hairTypeConditions})`;
            values.push(...filters.hairType);
        }

        // Handle multiple selections for hair moisture levels
        if (filters.hairMoist && filters.hairMoist.length > 0) {
            const hairMoistConditions = filters.hairMoist.map(() => `uat.hair_moisture_levels = ?`).join(" OR ");
            query += ` AND (${hairMoistConditions})`;
            values.push(...filters.hairMoist);
        }

        // Handle multiple selections for hair color
        if (filters.hairColour && filters.hairColour.length > 0) {
            const hairColourConditions = filters.hairColour.map(() => `uat.hair_colour = ?`).join(" OR ");
            query += ` AND (${hairColourConditions})`;
            values.push(...filters.hairColour);
        }

        // Handle multiple selections for skin concerns
        if (filters.skinConcerns && filters.skinConcerns.length > 0) {
            const skinConcernsConditions = filters.skinConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${skinConcernsConditions})`;
        }

        // Handle multiple selections for eye concerns
        if (filters.eyeConcerns && filters.eyeConcerns.length > 0) {
            const eyeConcernsConditions = filters.eyeConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${eyeConcernsConditions})`;
        }

        // Handle multiple selections for lip concerns
        if (filters.lipConcerns && filters.lipConcerns.length > 0) {
            const lipConcernsConditions = filters.lipConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${lipConcernsConditions})`;
        }

        // Handle multiple selections for body skin concerns
        if (filters.bodySkinConcerns && filters.bodySkinConcerns.length > 0) {
            const bodySkinConcernsConditions = filters.bodySkinConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${bodySkinConcernsConditions})`;
        }

        // Handle multiple selections for hair concerns
        if (filters.hairConcerns && filters.hairConcerns.length > 0) {
            const hairConcernsConditions = filters.hairConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${hairConcernsConditions})`;
        }

        // Handle multiple selections for scents
        if (filters.scents && filters.scents.length > 0) {
            const scentsConditions = filters.scents.map(scent => `uat.${scent} = 1`).join(" OR ");
            query += ` AND (${scentsConditions})`;
        }

        // Handle multiple selections for product concerns
        if (filters.productConcerns && filters.productConcerns.length > 0) {
            const productConcernsConditions = filters.productConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${productConcernsConditions})`;
        }

        // Apply limit if specified
        if (filters.limit) {
            query += " LIMIT ?";
            values.push(parseInt(filters.limit, 10));
        }

        pool.query(query, values)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

var filterSquadMembers = function (filters) {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                u.id AS user_id,
                u.username AS username,
                u.email AS user_email,
                u.country AS user_country,
                uat.skin_tone AS ua_skin_tone,
                uat.skin_type AS ua_skin_type,
                uat.eye_colour AS ua_eye_colour,
                p.instagram_handle AS instagram_handle,
                p.tiktok_handle AS tiktok_handle,
                (SELECT MAX(rev.created_at) FROM review rev WHERE rev.user_id = u.id) AS latest_review_date,
                (SELECT MAX(samint.created_at) FROM sampler_interactions samint WHERE samint.user_id = u.id) AS latest_campaign_date,
                (SELECT COUNT(*) FROM sampler_interactions samint WHERE samint.user_id = u.id) AS total_campaigns,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.status = 'COMPLETE') AS status_complete_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.status = 'IN_PROGRESS') AS status_in_progress_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.status = 'INCOMPLETE') AS status_incomplete_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'Yes, Definitely') AS include_again_yes_definitely_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'Yes') AS include_again_yes_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'Maybe') AS include_again_maybe_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again = 'No') AS include_again_no_count,
                (SELECT COUNT(*) FROM sampler_interactions si WHERE si.user_id = u.id AND si.include_again IS NULL) AS include_again_null_count
            FROM user u
            LEFT JOIN user_attribute uat ON u.id = uat.user_id
            LEFT JOIN profile p ON u.id = p.user_id
            WHERE 1=1
        `;
        const values = [];

        if (filters.memID) {
            query += " AND u.id = ?";
            values.push(filters.memID);
        }
        if (filters.country) {
            query += " AND u.country = ?";
            values.push(filters.country);
        }
        if (filters.skinTone) {
            query += " AND uat.skin_tone = ?";
            values.push(filters.skinTone);
        }
        if (filters.skinType) {
            query += " AND uat.skin_type = ?";
            values.push(filters.skinType);
        }
        if (filters.eyeColour) {
            query += " AND uat.eye_colour = ?";
            values.push(filters.eyeColour);
        }
        if (filters.sensitiveSkin) {
            query += " AND uat.sensitive_skin = ?";
            values.push(filters.sensitiveSkin);
        }
        if (filters.ageRange) {
            const [minAge, maxAge] = filters.ageRange.split("-").map(Number);
            query += " AND TIMESTAMPDIFF(YEAR, u.birthday, CURDATE()) BETWEEN ? AND ?";
            values.push(minAge, maxAge);
        }
        if (filters.hairMoist) {
            query += " AND uat.hair_moisture_levels = ?";
            values.push(filters.hairMoist);
        }
        if (filters.hairColour) {
            query += " AND uat.hair_colour = ?";
            values.push(filters.hairColour);
        }
        if (filters.hairType) {
            query += " AND uat.hair_type = ?";
            values.push(filters.hairType);
        }
        if (filters.skinConcerns && filters.skinConcerns.length > 0) {
            const skinConcernsConditions = filters.skinConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${skinConcernsConditions})`;
        }
        if (filters.eyeConcerns && filters.eyeConcerns.length > 0) {
            const eyeConcernsConditions = filters.eyeConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${eyeConcernsConditions})`;
        }
        if (filters.lipConcerns && filters.lipConcerns.length > 0) {
            const lipConcernsConditions = filters.lipConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${lipConcernsConditions})`;
        }
        if (filters.bodySkinConcerns && filters.bodySkinConcerns.length > 0) {
            const bodySkinConcernsConditions = filters.bodySkinConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${bodySkinConcernsConditions})`;
        }
        if (filters.hairConcerns && filters.hairConcerns.length > 0) {
            const hairConcernsConditions = filters.hairConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${hairConcernsConditions})`;
        }
        if (filters.scents && filters.scents.length > 0) {
            const scentsConditions = filters.scents.map(scent => `uat.${scent} = 1`).join(" OR ");
            query += ` AND (${scentsConditions})`;
        }
        if (filters.productConcerns && filters.productConcerns.length > 0) {
            const productConcernsConditions = filters.productConcerns.map(concern => `uat.${concern} = 1`).join(" OR ");
            query += ` AND (${productConcernsConditions})`;
        }

        // Apply limit if specified
        if (filters.limit) {
            query += " LIMIT ?";
            values.push(parseInt(filters.limit, 10));
        }

        pool.query(query, values)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

var filterCampaigns = function (filters) {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                id AS camp_id,
                campaign_ref AS sampling_campaign_ref,
                product_id,
                product_variant_id,
                posted_date,
                country
            FROM sampling_campaigns
            WHERE 1=1
        `;
        const values = [];

        if (filters.campaignId) {
            query += " AND id = ?";
            values.push(filters.campaignId);
        }
        if (filters.campaignRef) {
            query += " AND campaign_ref LIKE ?";
            values.push(`%${filters.campaignRef}%`);
        }
        if (filters.country) {
            query += " AND country = ?";
            values.push(filters.country);
        }

        if (filters.productId) {
            query += " AND product_id = ?";
            values.push(filters.productId);
        }
        
        if (filters.productVariantId) {
            query += " AND product_variant_id = ?";
            values.push(filters.productVariantId);
        }

        pool.query(query, values)
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
};

module.exports = {
    memberDetails,
    getCampDetails,
    getCampaignParticipants, 
    updateMember,
    login, 
    addMemberToCampaign, 
    removeMemberFromCampaign,
    getCampMemberDetails,
    updateAudienceMemberDetails,
    filterEligibleMembers,
    filterSquadMembers,
    filterCampaigns
};