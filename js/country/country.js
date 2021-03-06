var isoCountries = {
    'AF': 'Afghanistan',
    'AX': 'Aland Islands',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia And Herzegovina',
    'BW': 'Botswana',
    'BV': 'Bouvet Island',
    'BR': 'Brazil',
    'IO': 'British Indian Ocean Territory',
    'BN': 'Brunei Darussalam',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'CV': 'Cape Verde',
    'KY': 'Cayman Islands',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CX': 'Christmas Island',
    'CC': 'Cocos (Keeling) Islands',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Congo, Democratic Republic',
    'CK': 'Cook Islands',
    'CR': 'Costa Rica',
    'CI': 'Cote D\'Ivoire',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'ET': 'Ethiopia',
    'FK': 'Falkland Islands (Malvinas)',
    'FO': 'Faroe Islands',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GF': 'French Guiana',
    'PF': 'French Polynesia',
    'TF': 'French Southern Territories',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GI': 'Gibraltar',
    'GR': 'Greece',
    'GL': 'Greenland',
    'GD': 'Grenada',
    'GP': 'Guadeloupe',
    'GU': 'Guam',
    'GT': 'Guatemala',
    'GG': 'Guernsey',
    'GN': 'Guinea',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HM': 'Heard Island & Mcdonald Islands',
    'VA': 'Holy See (Vatican City State)',
    'HN': 'Honduras',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran, Islamic Republic Of',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IM': 'Isle Of Man',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JE': 'Jersey',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'KR': 'Korea',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Lao People\'s Democratic Republic',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libyan Arab Jamahiriya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macao',
    'MK': 'Macedonia',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MQ': 'Martinique',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'YT': 'Mayotte',
    'MX': 'Mexico',
    'FM': 'Micronesia, Federated States Of',
    'MD': 'Moldova',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MS': 'Montserrat',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'AN': 'Netherlands Antilles',
    'NC': 'New Caledonia',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NU': 'Niue',
    'NF': 'Norfolk Island',
    'MP': 'Northern Mariana Islands',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestinian Territory, Occupied',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PN': 'Pitcairn',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PR': 'Puerto Rico',
    'QA': 'Qatar',
    'RE': 'Reunion',
    'RO': 'Romania',
    'RU': 'Russian Federation',
    'RW': 'Rwanda',
    'BL': 'Saint Barthelemy',
    'SH': 'Saint Helena',
    'KN': 'Saint Kitts And Nevis',
    'LC': 'Saint Lucia',
    'MF': 'Saint Martin',
    'PM': 'Saint Pierre And Miquelon',
    'VC': 'Saint Vincent And Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'Sao Tome And Principe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'GS': 'South Georgia And Sandwich Isl.',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SJ': 'Svalbard And Jan Mayen',
    'SZ': 'Swaziland',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syrian Arab Republic',
    'TW': 'Taiwan',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TK': 'Tokelau',
    'TO': 'Tonga',
    'TT': 'Trinidad And Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TC': 'Turks And Caicos Islands',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UM': 'United States Outlying Islands',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela',
    'VN': 'Viet Nam',
    'VG': 'Virgin Islands, British',
    'VI': 'Virgin Islands, U.S.',
    'WF': 'Wallis And Futuna',
    'EH': 'Western Sahara',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
};

var lang = {
    "ab":{
        "name":"Abkhaz",
        "nativeName":"??????????"
    },
    "aa":{
        "name":"Afar",
        "nativeName":"Afaraf"
    },
    "af":{
        "name":"Afrikaans",
        "nativeName":"Afrikaans"
    },
    "ak":{
        "name":"Akan",
        "nativeName":"Akan"
    },
    "sq":{
        "name":"Albanian",
        "nativeName":"Shqip"
    },
    "am":{
        "name":"Amharic",
        "nativeName":"????????????"
    },
    "ar":{
        "name":"Arabic",
        "nativeName":"??????????????"
    },
    "an":{
        "name":"Aragonese",
        "nativeName":"Aragon??s"
    },
    "hy":{
        "name":"Armenian",
        "nativeName":"??????????????"
    },
    "as":{
        "name":"Assamese",
        "nativeName":"?????????????????????"
    },
    "av":{
        "name":"Avaric",
        "nativeName":"???????? ????????, ???????????????? ????????"
    },
    "ae":{
        "name":"Avestan",
        "nativeName":"avesta"
    },
    "ay":{
        "name":"Aymara",
        "nativeName":"aymar aru"
    },
    "az":{
        "name":"Azerbaijani",
        "nativeName":"az??rbaycan dili"
    },
    "bm":{
        "name":"Bambara",
        "nativeName":"bamanankan"
    },
    "ba":{
        "name":"Bashkir",
        "nativeName":"?????????????? ????????"
    },
    "eu":{
        "name":"Basque",
        "nativeName":"euskara, euskera"
    },
    "be":{
        "name":"Belarusian",
        "nativeName":"????????????????????"
    },
    "bn":{
        "name":"Bengali",
        "nativeName":"???????????????"
    },
    "bh":{
        "name":"Bihari",
        "nativeName":"?????????????????????"
    },
    "bi":{
        "name":"Bislama",
        "nativeName":"Bislama"
    },
    "bs":{
        "name":"Bosnian",
        "nativeName":"bosanski jezik"
    },
    "br":{
        "name":"Breton",
        "nativeName":"brezhoneg"
    },
    "bg":{
        "name":"Bulgarian",
        "nativeName":"?????????????????? ????????"
    },
    "my":{
        "name":"Burmese",
        "nativeName":"???????????????"
    },
    "ca":{
        "name":"Catalan; Valencian",
        "nativeName":"Catal??"
    },
    "ch":{
        "name":"Chamorro",
        "nativeName":"Chamoru"
    },
    "ce":{
        "name":"Chechen",
        "nativeName":"?????????????? ????????"
    },
    "ny":{
        "name":"Chichewa; Chewa; Nyanja",
        "nativeName":"chiChe??a, chinyanja"
    },
    "zh":{
        "name":"Chinese",
        "nativeName":"?????? (Zh??ngw??n), ??????, ??????"
    },
    "cv":{
        "name":"Chuvash",
        "nativeName":"?????????? ??????????"
    },
    "kw":{
        "name":"Cornish",
        "nativeName":"Kernewek"
    },
    "co":{
        "name":"Corsican",
        "nativeName":"corsu, lingua corsa"
    },
    "cr":{
        "name":"Cree",
        "nativeName":"?????????????????????"
    },
    "hr":{
        "name":"Croatian",
        "nativeName":"hrvatski"
    },
    "cs":{
        "name":"Czech",
        "nativeName":"??esky, ??e??tina"
    },
    "da":{
        "name":"Danish",
        "nativeName":"dansk"
    },
    "dv":{
        "name":"Divehi; Dhivehi; Maldivian;",
        "nativeName":"????????????"
    },
    "nl":{
        "name":"Dutch",
        "nativeName":"Nederlands, Vlaams"
    },
    "en":{
        "name":"English",
        "nativeName":"English"
    },
    "eo":{
        "name":"Esperanto",
        "nativeName":"Esperanto"
    },
    "et":{
        "name":"Estonian",
        "nativeName":"eesti, eesti keel"
    },
    "ee":{
        "name":"Ewe",
        "nativeName":"E??egbe"
    },
    "fo":{
        "name":"Faroese",
        "nativeName":"f??royskt"
    },
    "fj":{
        "name":"Fijian",
        "nativeName":"vosa Vakaviti"
    },
    "fi":{
        "name":"Finnish",
        "nativeName":"suomi, suomen kieli"
    },
    "fr":{
        "name":"French",
        "nativeName":"fran??ais, langue fran??aise"
    },
    "ff":{
        "name":"Fula; Fulah; Pulaar; Pular",
        "nativeName":"Fulfulde, Pulaar, Pular"
    },
    "gl":{
        "name":"Galician",
        "nativeName":"Galego"
    },
    "ka":{
        "name":"Georgian",
        "nativeName":"?????????????????????"
    },
    "de":{
        "name":"German",
        "nativeName":"Deutsch"
    },
    "el":{
        "name":"Greek, Modern",
        "nativeName":"????????????????"
    },
    "gn":{
        "name":"Guaran??",
        "nativeName":"Ava??e???"
    },
    "gu":{
        "name":"Gujarati",
        "nativeName":"?????????????????????"
    },
    "ht":{
        "name":"Haitian; Haitian Creole",
        "nativeName":"Krey??l ayisyen"
    },
    "ha":{
        "name":"Hausa",
        "nativeName":"Hausa, ????????????"
    },
    "he":{
        "name":"Hebrew (modern)",
        "nativeName":"??????????"
    },
    "hz":{
        "name":"Herero",
        "nativeName":"Otjiherero"
    },
    "hi":{
        "name":"Hindi",
        "nativeName":"??????????????????, ???????????????"
    },
    "ho":{
        "name":"Hiri Motu",
        "nativeName":"Hiri Motu"
    },
    "hu":{
        "name":"Hungarian",
        "nativeName":"Magyar"
    },
    "ia":{
        "name":"Interlingua",
        "nativeName":"Interlingua"
    },
    "id":{
        "name":"Indonesian",
        "nativeName":"Bahasa Indonesia"
    },
    "ie":{
        "name":"Interlingue",
        "nativeName":"Originally called Occidental; then Interlingue after WWII"
    },
    "ga":{
        "name":"Irish",
        "nativeName":"Gaeilge"
    },
    "ig":{
        "name":"Igbo",
        "nativeName":"As???s??? Igbo"
    },
    "ik":{
        "name":"Inupiaq",
        "nativeName":"I??upiaq, I??upiatun"
    },
    "io":{
        "name":"Ido",
        "nativeName":"Ido"
    },
    "is":{
        "name":"Icelandic",
        "nativeName":"??slenska"
    },
    "it":{
        "name":"Italian",
        "nativeName":"Italiano"
    },
    "iu":{
        "name":"Inuktitut",
        "nativeName":"??????????????????"
    },
    "ja":{
        "name":"Japanese",
        "nativeName":"????????? (??????????????????????????????)"
    },
    "jv":{
        "name":"Javanese",
        "nativeName":"basa Jawa"
    },
    "kl":{
        "name":"Kalaallisut, Greenlandic",
        "nativeName":"kalaallisut, kalaallit oqaasii"
    },
    "kn":{
        "name":"Kannada",
        "nativeName":"???????????????"
    },
    "kr":{
        "name":"Kanuri",
        "nativeName":"Kanuri"
    },
    "ks":{
        "name":"Kashmiri",
        "nativeName":"?????????????????????, ???????????????"
    },
    "kk":{
        "name":"Kazakh",
        "nativeName":"?????????? ????????"
    },
    "km":{
        "name":"Khmer",
        "nativeName":"???????????????????????????"
    },
    "ki":{
        "name":"Kikuyu, Gikuyu",
        "nativeName":"G??k??y??"
    },
    "rw":{
        "name":"Kinyarwanda",
        "nativeName":"Ikinyarwanda"
    },
    "ky":{
        "name":"Kirghiz, Kyrgyz",
        "nativeName":"???????????? ????????"
    },
    "kv":{
        "name":"Komi",
        "nativeName":"???????? ??????"
    },
    "kg":{
        "name":"Kongo",
        "nativeName":"KiKongo"
    },
    "ko":{
        "name":"Korean",
        "nativeName":"????????? (?????????), ????????? (?????????)"
    },
    "ku":{
        "name":"Kurdish",
        "nativeName":"Kurd??, ?????????????"
    },
    "kj":{
        "name":"Kwanyama, Kuanyama",
        "nativeName":"Kuanyama"
    },
    "la":{
        "name":"Latin",
        "nativeName":"latine, lingua latina"
    },
    "lb":{
        "name":"Luxembourgish, Letzeburgesch",
        "nativeName":"L??tzebuergesch"
    },
    "lg":{
        "name":"Luganda",
        "nativeName":"Luganda"
    },
    "li":{
        "name":"Limburgish, Limburgan, Limburger",
        "nativeName":"Limburgs"
    },
    "ln":{
        "name":"Lingala",
        "nativeName":"Ling??la"
    },
    "lo":{
        "name":"Lao",
        "nativeName":"?????????????????????"
    },
    "lt":{
        "name":"Lithuanian",
        "nativeName":"lietuvi?? kalba"
    },
    "lu":{
        "name":"Luba-Katanga",
        "nativeName":""
    },
    "lv":{
        "name":"Latvian",
        "nativeName":"latvie??u valoda"
    },
    "gv":{
        "name":"Manx",
        "nativeName":"Gaelg, Gailck"
    },
    "mk":{
        "name":"Macedonian",
        "nativeName":"???????????????????? ??????????"
    },
    "mg":{
        "name":"Malagasy",
        "nativeName":"Malagasy fiteny"
    },
    "ms":{
        "name":"Malay",
        "nativeName":"bahasa Melayu, ???????? ?????????????"
    },
    "ml":{
        "name":"Malayalam",
        "nativeName":"??????????????????"
    },
    "mt":{
        "name":"Maltese",
        "nativeName":"Malti"
    },
    "mi":{
        "name":"M??ori",
        "nativeName":"te reo M??ori"
    },
    "mr":{
        "name":"Marathi (Mar?????h??)",
        "nativeName":"???????????????"
    },
    "mh":{
        "name":"Marshallese",
        "nativeName":"Kajin M??aje??"
    },
    "mn":{
        "name":"Mongolian",
        "nativeName":"????????????"
    },
    "na":{
        "name":"Nauru",
        "nativeName":"Ekakair?? Naoero"
    },
    "nv":{
        "name":"Navajo, Navaho",
        "nativeName":"Din?? bizaad, Din??k??eh????"
    },
    "nb":{
        "name":"Norwegian Bokm??l",
        "nativeName":"Norsk bokm??l"
    },
    "nd":{
        "name":"North Ndebele",
        "nativeName":"isiNdebele"
    },
    "ne":{
        "name":"Nepali",
        "nativeName":"??????????????????"
    },
    "ng":{
        "name":"Ndonga",
        "nativeName":"Owambo"
    },
    "nn":{
        "name":"Norwegian Nynorsk",
        "nativeName":"Norsk nynorsk"
    },
    "no":{
        "name":"Norwegian",
        "nativeName":"Norsk"
    },
    "ii":{
        "name":"Nuosu",
        "nativeName":"????????? Nuosuhxop"
    },
    "nr":{
        "name":"South Ndebele",
        "nativeName":"isiNdebele"
    },
    "oc":{
        "name":"Occitan",
        "nativeName":"Occitan"
    },
    "oj":{
        "name":"Ojibwe, Ojibwa",
        "nativeName":"????????????????????????"
    },
    "cu":{
        "name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        "nativeName":"?????????? ????????????????????"
    },
    "om":{
        "name":"Oromo",
        "nativeName":"Afaan Oromoo"
    },
    "or":{
        "name":"Oriya",
        "nativeName":"???????????????"
    },
    "os":{
        "name":"Ossetian, Ossetic",
        "nativeName":"???????? ??????????"
    },
    "pa":{
        "name":"Panjabi, Punjabi",
        "nativeName":"??????????????????, ???????????????"
    },
    "pi":{
        "name":"P??li",
        "nativeName":"????????????"
    },
    "fa":{
        "name":"Persian",
        "nativeName":"??????????"
    },
    "pl":{
        "name":"Polish",
        "nativeName":"polski"
    },
    "ps":{
        "name":"Pashto, Pushto",
        "nativeName":"????????"
    },
    "pt":{
        "name":"Portuguese",
        "nativeName":"Portugu??s"
    },
    "qu":{
        "name":"Quechua",
        "nativeName":"Runa Simi, Kichwa"
    },
    "rm":{
        "name":"Romansh",
        "nativeName":"rumantsch grischun"
    },
    "rn":{
        "name":"Kirundi",
        "nativeName":"kiRundi"
    },
    "ro":{
        "name":"Romanian, Moldavian, Moldovan",
        "nativeName":"rom??n??"
    },
    "ru":{
        "name":"Russian",
        "nativeName":"?????????????? ????????"
    },
    "sa":{
        "name":"Sanskrit (Sa???sk???ta)",
        "nativeName":"???????????????????????????"
    },
    "sc":{
        "name":"Sardinian",
        "nativeName":"sardu"
    },
    "sd":{
        "name":"Sindhi",
        "nativeName":"??????????????????, ?????????? ?????????????"
    },
    "se":{
        "name":"Northern Sami",
        "nativeName":"Davvis??megiella"
    },
    "sm":{
        "name":"Samoan",
        "nativeName":"gagana faa Samoa"
    },
    "sg":{
        "name":"Sango",
        "nativeName":"y??ng?? t?? s??ng??"
    },
    "sr":{
        "name":"Serbian",
        "nativeName":"???????????? ??????????"
    },
    "gd":{
        "name":"Scottish Gaelic; Gaelic",
        "nativeName":"G??idhlig"
    },
    "sn":{
        "name":"Shona",
        "nativeName":"chiShona"
    },
    "si":{
        "name":"Sinhala, Sinhalese",
        "nativeName":"???????????????"
    },
    "sk":{
        "name":"Slovak",
        "nativeName":"sloven??ina"
    },
    "sl":{
        "name":"Slovene",
        "nativeName":"sloven????ina"
    },
    "so":{
        "name":"Somali",
        "nativeName":"Soomaaliga, af Soomaali"
    },
    "st":{
        "name":"Southern Sotho",
        "nativeName":"Sesotho"
    },
    "es":{
        "name":"Spanish; Castilian",
        "nativeName":"espa??ol, castellano"
    },
    "su":{
        "name":"Sundanese",
        "nativeName":"Basa Sunda"
    },
    "sw":{
        "name":"Swahili",
        "nativeName":"Kiswahili"
    },
    "ss":{
        "name":"Swati",
        "nativeName":"SiSwati"
    },
    "sv":{
        "name":"Swedish",
        "nativeName":"svenska"
    },
    "ta":{
        "name":"Tamil",
        "nativeName":"???????????????"
    },
    "te":{
        "name":"Telugu",
        "nativeName":"??????????????????"
    },
    "tg":{
        "name":"Tajik",
        "nativeName":"????????????, to??ik??, ???????????????"
    },
    "th":{
        "name":"Thai",
        "nativeName":"?????????"
    },
    "ti":{
        "name":"Tigrinya",
        "nativeName":"????????????"
    },
    "bo":{
        "name":"Tibetan Standard, Tibetan, Central",
        "nativeName":"?????????????????????"
    },
    "tk":{
        "name":"Turkmen",
        "nativeName":"T??rkmen, ??????????????"
    },
    "tl":{
        "name":"Tagalog",
        "nativeName":"Wikang Tagalog, ??????????????? ??????????????????"
    },
    "tn":{
        "name":"Tswana",
        "nativeName":"Setswana"
    },
    "to":{
        "name":"Tonga (Tonga Islands)",
        "nativeName":"faka Tonga"
    },
    "tr":{
        "name":"Turkish",
        "nativeName":"T??rk??e"
    },
    "ts":{
        "name":"Tsonga",
        "nativeName":"Xitsonga"
    },
    "tt":{
        "name":"Tatar",
        "nativeName":"??????????????, tatar??a, ?????????????????"
    },
    "tw":{
        "name":"Twi",
        "nativeName":"Twi"
    },
    "ty":{
        "name":"Tahitian",
        "nativeName":"Reo Tahiti"
    },
    "ug":{
        "name":"Uighur, Uyghur",
        "nativeName":"Uy??urq??, ???????????????????"
    },
    "uk":{
        "name":"Ukrainian",
        "nativeName":"????????????????????"
    },
    "ur":{
        "name":"Urdu",
        "nativeName":"????????"
    },
    "uz":{
        "name":"Uzbek",
        "nativeName":"zbek, ??????????, ???????????????"
    },
    "ve":{
        "name":"Venda",
        "nativeName":"Tshiven???a"
    },
    "vi":{
        "name":"Vietnamese",
        "nativeName":"Ti???ng Vi???t"
    },
    "vo":{
        "name":"Volap??k",
        "nativeName":"Volap??k"
    },
    "wa":{
        "name":"Walloon",
        "nativeName":"Walon"
    },
    "cy":{
        "name":"Welsh",
        "nativeName":"Cymraeg"
    },
    "wo":{
        "name":"Wolof",
        "nativeName":"Wollof"
    },
    "fy":{
        "name":"Western Frisian",
        "nativeName":"Frysk"
    },
    "xh":{
        "name":"Xhosa",
        "nativeName":"isiXhosa"
    },
    "yi":{
        "name":"Yiddish",
        "nativeName":"????????????"
    },
    "yo":{
        "name":"Yoruba",
        "nativeName":"Yor??b??"
    },
    "za":{
        "name":"Zhuang, Chuang",
        "nativeName":"Sa?? cue????, Saw cuengh"
    }
}

var complete = {
    "AB": {
        "language_name": "Abkhaz",
        "language_native": "??????????"
    },
    "AA": {
        "language_name": "Afar",
        "language_native": "Afaraf"
    },
    "AF": {
        "language_name": "Afrikaans",
        "language_native": "Afrikaans",
        "phone": "93",
        "continent": "AS",
        "capital": "Kabul",
        "currency": "AFN",
        "languages": [
            "ps",
            "uz",
            "tk"
        ],
        "country_name": "Afghanistan",
        "country_native": "??????????????????",
        "continent_name": "Asia"
    },
    "AK": {
        "language_name": "Akan",
        "language_native": "Akan"
    },
    "SQ": {
        "language_name": "Albanian",
        "language_native": "Shqip"
    },
    "AM": {
        "language_name": "Amharic",
        "language_native": "????????????",
        "phone": "374",
        "continent": "AS",
        "capital": "Yerevan",
        "currency": "AMD",
        "languages": [
            "hy",
            "ru"
        ],
        "country_name": "Armenia",
        "country_native": "????????????????",
        "continent_name": "Asia"
    },
    "AR": {
        "language_name": "Arabic",
        "language_native": "??????????????",
        "phone": "54",
        "continent": "SA",
        "capital": "Buenos Aires",
        "currency": "ARS",
        "languages": [
            "es",
            "gn"
        ],
        "country_name": "Argentina",
        "country_native": "Argentina",
        "continent_name": "South America"
    },
    "AN": {
        "language_name": "Aragonese",
        "language_native": "Aragon??s"
    },
    "HY": {
        "language_name": "Armenian",
        "language_native": "??????????????"
    },
    "AS": {
        "language_name": "Assamese",
        "language_native": "?????????????????????",
        "phone": "1684",
        "continent": "OC",
        "capital": "Pago Pago",
        "currency": "USD",
        "languages": [
            "en",
            "sm"
        ],
        "country_name": "American Samoa",
        "country_native": "American Samoa",
        "continent_name": "Oceania"
    },
    "AV": {
        "language_name": "Avaric",
        "language_native": "???????? ????????, ???????????????? ????????"
    },
    "AE": {
        "language_name": "Avestan",
        "language_native": "avesta",
        "phone": "971",
        "continent": "AS",
        "capital": "Abu Dhabi",
        "currency": "AED",
        "languages": [
            "ar"
        ],
        "country_name": "United Arab Emirates",
        "country_native": "???????? ???????????????? ?????????????? ??????????????",
        "continent_name": "Asia"
    },
    "AY": {
        "language_name": "Aymara",
        "language_native": "aymar aru"
    },
    "AZ": {
        "language_name": "Azerbaijani",
        "language_native": "az??rbaycan dili",
        "phone": "994",
        "continent": "AS",
        "capital": "Baku",
        "currency": "AZN",
        "languages": [
            "az"
        ],
        "country_name": "Azerbaijan",
        "country_native": "Az??rbaycan",
        "continent_name": "Asia"
    },
    "BM": {
        "language_name": "Bambara",
        "language_native": "bamanankan",
        "phone": "1441",
        "continent": "NA",
        "capital": "Hamilton",
        "currency": "BMD",
        "languages": [
            "en"
        ],
        "country_name": "Bermuda",
        "country_native": "Bermuda",
        "continent_name": "North America"
    },
    "BA": {
        "language_name": "Bashkir",
        "language_native": "?????????????? ????????",
        "phone": "387",
        "continent": "EU",
        "capital": "Sarajevo",
        "currency": "BAM",
        "languages": [
            "bs",
            "hr",
            "sr"
        ],
        "country_name": "Bosnia and Herzegovina",
        "country_native": "Bosna i Hercegovina",
        "continent_name": "Europe"
    },
    "EU": {
        "language_name": "Basque",
        "language_native": "euskara, euskera"
    },
    "BE": {
        "language_name": "Belarusian",
        "language_native": "????????????????????",
        "phone": "32",
        "continent": "EU",
        "capital": "Brussels",
        "currency": "EUR",
        "languages": [
            "nl",
            "fr",
            "de"
        ],
        "country_name": "Belgium",
        "country_native": "Belgi??",
        "continent_name": "Europe"
    },
    "BN": {
        "language_name": "Bengali",
        "language_native": "???????????????",
        "phone": "673",
        "continent": "AS",
        "capital": "Bandar Seri Begawan",
        "currency": "BND",
        "languages": [
            "ms"
        ],
        "country_name": "Brunei",
        "country_native": "Negara Brunei Darussalam",
        "continent_name": "Asia"
    },
    "BH": {
        "language_name": "Bihari",
        "language_native": "?????????????????????",
        "phone": "973",
        "continent": "AS",
        "capital": "Manama",
        "currency": "BHD",
        "languages": [
            "ar"
        ],
        "country_name": "Bahrain",
        "country_native": "?????????????????",
        "continent_name": "Asia"
    },
    "BI": {
        "language_name": "Bislama",
        "language_native": "Bislama",
        "phone": "257",
        "continent": "AF",
        "capital": "Bujumbura",
        "currency": "BIF",
        "languages": [
            "fr",
            "rn"
        ],
        "country_name": "Burundi",
        "country_native": "Burundi",
        "continent_name": "Africa"
    },
    "BS": {
        "language_name": "Bosnian",
        "language_native": "bosanski jezik",
        "phone": "1242",
        "continent": "NA",
        "capital": "Nassau",
        "currency": "BSD",
        "languages": [
            "en"
        ],
        "country_name": "Bahamas",
        "country_native": "Bahamas",
        "continent_name": "North America"
    },
    "BR": {
        "language_name": "Breton",
        "language_native": "brezhoneg",
        "phone": "55",
        "continent": "SA",
        "capital": "Bras??lia",
        "currency": "BRL",
        "languages": [
            "pt"
        ],
        "country_name": "Brazil",
        "country_native": "Brasil",
        "continent_name": "South America"
    },
    "BG": {
        "language_name": "Bulgarian",
        "language_native": "?????????????????? ????????",
        "phone": "359",
        "continent": "EU",
        "capital": "Sofia",
        "currency": "BGN",
        "languages": [
            "bg"
        ],
        "country_name": "Bulgaria",
        "country_native": "????????????????",
        "continent_name": "Europe"
    },
    "MY": {
        "language_name": "Burmese",
        "language_native": "???????????????",
        "phone": "60",
        "continent": "AS",
        "capital": "Kuala Lumpur",
        "currency": "MYR",
        "languages": [
            "ms"
        ],
        "country_name": "Malaysia",
        "country_native": "Malaysia",
        "continent_name": "Asia"
    },
    "CA": {
        "language_name": "Catalan; Valencian",
        "language_native": "Catal??",
        "phone": "1",
        "continent": "NA",
        "capital": "Ottawa",
        "currency": "CAD",
        "languages": [
            "en",
            "fr"
        ],
        "country_name": "Canada",
        "country_native": "Canada",
        "continent_name": "North America"
    },
    "CH": {
        "language_name": "Chamorro",
        "language_native": "Chamoru",
        "phone": "41",
        "continent": "EU",
        "capital": "Bern",
        "currency": "CHE,CHF,CHW",
        "languages": [
            "de",
            "fr",
            "it"
        ],
        "country_name": "Switzerland",
        "country_native": "Schweiz",
        "continent_name": "Europe"
    },
    "CE": {
        "language_name": "Chechen",
        "language_native": "?????????????? ????????"
    },
    "NY": {
        "language_name": "Chichewa; Chewa; Nyanja",
        "language_native": "chiChe??a, chinyanja"
    },
    "ZH": {
        "language_name": "Chinese",
        "language_native": "?????? (Zh??ngw??n), ??????, ??????"
    },
    "CV": {
        "language_name": "Chuvash",
        "language_native": "?????????? ??????????",
        "phone": "238",
        "continent": "AF",
        "capital": "Praia",
        "currency": "CVE",
        "languages": [
            "pt"
        ],
        "country_name": "Cape Verde",
        "country_native": "Cabo Verde",
        "continent_name": "Africa"
    },
    "KW": {
        "language_name": "Cornish",
        "language_native": "Kernewek",
        "phone": "965",
        "continent": "AS",
        "capital": "Kuwait City",
        "currency": "KWD",
        "languages": [
            "ar"
        ],
        "country_name": "Kuwait",
        "country_native": "????????????",
        "continent_name": "Asia"
    },
    "CO": {
        "language_name": "Corsican",
        "language_native": "corsu, lingua corsa",
        "phone": "57",
        "continent": "SA",
        "capital": "Bogot??",
        "currency": "COP",
        "languages": [
            "es"
        ],
        "country_name": "Colombia",
        "country_native": "Colombia",
        "continent_name": "South America"
    },
    "CR": {
        "language_name": "Cree",
        "language_native": "?????????????????????",
        "phone": "506",
        "continent": "NA",
        "capital": "San Jos??",
        "currency": "CRC",
        "languages": [
            "es"
        ],
        "country_name": "Costa Rica",
        "country_native": "Costa Rica",
        "continent_name": "North America"
    },
    "HR": {
        "language_name": "Croatian",
        "language_native": "hrvatski",
        "phone": "385",
        "continent": "EU",
        "capital": "Zagreb",
        "currency": "HRK",
        "languages": [
            "hr"
        ],
        "country_name": "Croatia",
        "country_native": "Hrvatska",
        "continent_name": "Europe"
    },
    "CS": {
        "language_name": "Czech",
        "language_native": "??esky, ??e??tina"
    },
    "DA": {
        "language_name": "Danish",
        "language_native": "dansk"
    },
    "DV": {
        "language_name": "Divehi; Dhivehi; Maldivian;",
        "language_native": "????????????"
    },
    "NL": {
        "language_name": "Dutch",
        "language_native": "Nederlands, Vlaams",
        "phone": "31",
        "continent": "EU",
        "capital": "Amsterdam",
        "currency": "EUR",
        "languages": [
            "nl"
        ],
        "country_name": "Netherlands",
        "country_native": "Nederland",
        "continent_name": "Europe"
    },
    "EN": {
        "language_name": "English",
        "language_native": "English"
    },
    "EO": {
        "language_name": "Esperanto",
        "language_native": "Esperanto"
    },
    "ET": {
        "language_name": "Estonian",
        "language_native": "eesti, eesti keel",
        "phone": "251",
        "continent": "AF",
        "capital": "Addis Ababa",
        "currency": "ETB",
        "languages": [
            "am"
        ],
        "country_name": "Ethiopia",
        "country_native": "???????????????",
        "continent_name": "Africa"
    },
    "EE": {
        "language_name": "Ewe",
        "language_native": "E??egbe",
        "phone": "372",
        "continent": "EU",
        "capital": "Tallinn",
        "currency": "EUR",
        "languages": [
            "et"
        ],
        "country_name": "Estonia",
        "country_native": "Eesti",
        "continent_name": "Europe"
    },
    "FO": {
        "language_name": "Faroese",
        "language_native": "f??royskt",
        "phone": "298",
        "continent": "EU",
        "capital": "T??rshavn",
        "currency": "DKK",
        "languages": [
            "fo"
        ],
        "country_name": "Faroe Islands",
        "country_native": "F??royar",
        "continent_name": "Europe"
    },
    "FJ": {
        "language_name": "Fijian",
        "language_native": "vosa Vakaviti",
        "phone": "679",
        "continent": "OC",
        "capital": "Suva",
        "currency": "FJD",
        "languages": [
            "en",
            "fj",
            "hi",
            "ur"
        ],
        "country_name": "Fiji",
        "country_native": "Fiji",
        "continent_name": "Oceania"
    },
    "FI": {
        "language_name": "Finnish",
        "language_native": "suomi, suomen kieli",
        "phone": "358",
        "continent": "EU",
        "capital": "Helsinki",
        "currency": "EUR",
        "languages": [
            "fi",
            "sv"
        ],
        "country_name": "Finland",
        "country_native": "Suomi",
        "continent_name": "Europe"
    },
    "FR": {
        "language_name": "French",
        "language_native": "fran??ais, langue fran??aise",
        "phone": "33",
        "continent": "EU",
        "capital": "Paris",
        "currency": "EUR",
        "languages": [
            "fr"
        ],
        "country_name": "France",
        "country_native": "France",
        "continent_name": "Europe"
    },
    "FF": {
        "language_name": "Fula; Fulah; Pulaar; Pular",
        "language_native": "Fulfulde, Pulaar, Pular"
    },
    "GL": {
        "language_name": "Galician",
        "language_native": "Galego",
        "phone": "299",
        "continent": "NA",
        "capital": "Nuuk",
        "currency": "DKK",
        "languages": [
            "kl"
        ],
        "country_name": "Greenland",
        "country_native": "Kalaallit Nunaat",
        "continent_name": "North America"
    },
    "KA": {
        "language_name": "Georgian",
        "language_native": "?????????????????????"
    },
    "DE": {
        "language_name": "German",
        "language_native": "Deutsch",
        "phone": "49",
        "continent": "EU",
        "capital": "Berlin",
        "currency": "EUR",
        "languages": [
            "de"
        ],
        "country_name": "Germany",
        "country_native": "Deutschland",
        "continent_name": "Europe"
    },
    "EL": {
        "language_name": "Greek, Modern",
        "language_native": "????????????????"
    },
    "GN": {
        "language_name": "Guaran??",
        "language_native": "Ava??e???",
        "phone": "224",
        "continent": "AF",
        "capital": "Conakry",
        "currency": "GNF",
        "languages": [
            "fr",
            "ff"
        ],
        "country_name": "Guinea",
        "country_native": "Guin??e",
        "continent_name": "Africa"
    },
    "GU": {
        "language_name": "Gujarati",
        "language_native": "?????????????????????",
        "phone": "1671",
        "continent": "OC",
        "capital": "Hag??t??a",
        "currency": "USD",
        "languages": [
            "en",
            "ch",
            "es"
        ],
        "country_name": "Guam",
        "country_native": "Guam",
        "continent_name": "Oceania"
    },
    "HT": {
        "language_name": "Haitian; Haitian Creole",
        "language_native": "Krey??l ayisyen",
        "phone": "509",
        "continent": "NA",
        "capital": "Port-au-Prince",
        "currency": "HTG,USD",
        "languages": [
            "fr",
            "ht"
        ],
        "country_name": "Haiti",
        "country_native": "Ha??ti",
        "continent_name": "North America"
    },
    "HA": {
        "language_name": "Hausa",
        "language_native": "Hausa, ????????????"
    },
    "HE": {
        "language_name": "Hebrew (modern)",
        "language_native": "??????????"
    },
    "HZ": {
        "language_name": "Herero",
        "language_native": "Otjiherero"
    },
    "HI": {
        "language_name": "Hindi",
        "language_native": "??????????????????, ???????????????"
    },
    "HO": {
        "language_name": "Hiri Motu",
        "language_native": "Hiri Motu"
    },
    "HU": {
        "language_name": "Hungarian",
        "language_native": "Magyar",
        "phone": "36",
        "continent": "EU",
        "capital": "Budapest",
        "currency": "HUF",
        "languages": [
            "hu"
        ],
        "country_name": "Hungary",
        "country_native": "Magyarorsz??g",
        "continent_name": "Europe"
    },
    "IA": {
        "language_name": "Interlingua",
        "language_native": "Interlingua"
    },
    "ID": {
        "language_name": "Indonesian",
        "language_native": "Bahasa Indonesia",
        "phone": "62",
        "continent": "AS",
        "capital": "Jakarta",
        "currency": "IDR",
        "languages": [
            "id"
        ],
        "country_name": "Indonesia",
        "country_native": "Indonesia",
        "continent_name": "Asia"
    },
    "IE": {
        "language_name": "Interlingue",
        "language_native": "Originally called Occidental; then Interlingue after WWII",
        "phone": "353",
        "continent": "EU",
        "capital": "Dublin",
        "currency": "EUR",
        "languages": [
            "ga",
            "en"
        ],
        "country_name": "Ireland",
        "country_native": "??ire",
        "continent_name": "Europe"
    },
    "GA": {
        "language_name": "Irish",
        "language_native": "Gaeilge",
        "phone": "241",
        "continent": "AF",
        "capital": "Libreville",
        "currency": "XAF",
        "languages": [
            "fr"
        ],
        "country_name": "Gabon",
        "country_native": "Gabon",
        "continent_name": "Africa"
    },
    "IG": {
        "language_name": "Igbo",
        "language_native": "As???s??? Igbo"
    },
    "IK": {
        "language_name": "Inupiaq",
        "language_native": "I??upiaq, I??upiatun"
    },
    "IO": {
        "language_name": "Ido",
        "language_native": "Ido",
        "phone": "246",
        "continent": "AS",
        "capital": "Diego Garcia",
        "currency": "USD",
        "languages": [
            "en"
        ],
        "country_name": "British Indian Ocean Territory",
        "country_native": "British Indian Ocean Territory",
        "continent_name": "Asia"
    },
    "IS": {
        "language_name": "Icelandic",
        "language_native": "??slenska",
        "phone": "354",
        "continent": "EU",
        "capital": "Reykjavik",
        "currency": "ISK",
        "languages": [
            "is"
        ],
        "country_name": "Iceland",
        "country_native": "??sland",
        "continent_name": "Europe"
    },
    "IT": {
        "language_name": "Italian",
        "language_native": "Italiano",
        "phone": "39",
        "continent": "EU",
        "capital": "Rome",
        "currency": "EUR",
        "languages": [
            "it"
        ],
        "country_name": "Italy",
        "country_native": "Italia",
        "continent_name": "Europe"
    },
    "IU": {
        "language_name": "Inuktitut",
        "language_native": "??????????????????"
    },
    "JA": {
        "language_name": "Japanese",
        "language_native": "????????? (??????????????????????????????)"
    },
    "JV": {
        "language_name": "Javanese",
        "language_native": "basa Jawa"
    },
    "KL": {
        "language_name": "Kalaallisut, Greenlandic",
        "language_native": "kalaallisut, kalaallit oqaasii"
    },
    "KN": {
        "language_name": "Kannada",
        "language_native": "???????????????",
        "phone": "1869",
        "continent": "NA",
        "capital": "Basseterre",
        "currency": "XCD",
        "languages": [
            "en"
        ],
        "country_name": "Saint Kitts and Nevis",
        "country_native": "Saint Kitts and Nevis",
        "continent_name": "North America"
    },
    "KR": {
        "language_name": "Kanuri",
        "language_native": "Kanuri",
        "phone": "82",
        "continent": "AS",
        "capital": "Seoul",
        "currency": "KRW",
        "languages": [
            "ko"
        ],
        "country_name": "South Korea",
        "country_native": "????????????",
        "continent_name": "Asia"
    },
    "KS": {
        "language_name": "Kashmiri",
        "language_native": "?????????????????????, ???????????????"
    },
    "KK": {
        "language_name": "Kazakh",
        "language_native": "?????????? ????????"
    },
    "KM": {
        "language_name": "Khmer",
        "language_native": "???????????????????????????",
        "phone": "269",
        "continent": "AF",
        "capital": "Moroni",
        "currency": "KMF",
        "languages": [
            "ar",
            "fr"
        ],
        "country_name": "Comoros",
        "country_native": "Komori",
        "continent_name": "Africa"
    },
    "KI": {
        "language_name": "Kikuyu, Gikuyu",
        "language_native": "G??k??y??",
        "phone": "686",
        "continent": "OC",
        "capital": "South Tarawa",
        "currency": "AUD",
        "languages": [
            "en"
        ],
        "country_name": "Kiribati",
        "country_native": "Kiribati",
        "continent_name": "Oceania"
    },
    "RW": {
        "language_name": "Kinyarwanda",
        "language_native": "Ikinyarwanda",
        "phone": "250",
        "continent": "AF",
        "capital": "Kigali",
        "currency": "RWF",
        "languages": [
            "rw",
            "en",
            "fr"
        ],
        "country_name": "Rwanda",
        "country_native": "Rwanda",
        "continent_name": "Africa"
    },
    "KY": {
        "language_name": "Kirghiz, Kyrgyz",
        "language_native": "???????????? ????????",
        "phone": "1345",
        "continent": "NA",
        "capital": "George Town",
        "currency": "KYD",
        "languages": [
            "en"
        ],
        "country_name": "Cayman Islands",
        "country_native": "Cayman Islands",
        "continent_name": "North America"
    },
    "KV": {
        "language_name": "Komi",
        "language_native": "???????? ??????"
    },
    "KG": {
        "language_name": "Kongo",
        "language_native": "KiKongo",
        "phone": "996",
        "continent": "AS",
        "capital": "Bishkek",
        "currency": "KGS",
        "languages": [
            "ky",
            "ru"
        ],
        "country_name": "Kyrgyzstan",
        "country_native": "????????????????????",
        "continent_name": "Asia"
    },
    "KO": {
        "language_name": "Korean",
        "language_native": "????????? (?????????), ????????? (?????????)"
    },
    "KU": {
        "language_name": "Kurdish",
        "language_native": "Kurd??, ?????????????"
    },
    "KJ": {
        "language_name": "Kwanyama, Kuanyama",
        "language_native": "Kuanyama"
    },
    "LA": {
        "language_name": "Latin",
        "language_native": "latine, lingua latina",
        "phone": "856",
        "continent": "AS",
        "capital": "Vientiane",
        "currency": "LAK",
        "languages": [
            "lo"
        ],
        "country_name": "Laos",
        "country_native": "??????????????????",
        "continent_name": "Asia"
    },
    "LB": {
        "language_name": "Luxembourgish, Letzeburgesch",
        "language_native": "L??tzebuergesch",
        "phone": "961",
        "continent": "AS",
        "capital": "Beirut",
        "currency": "LBP",
        "languages": [
            "ar",
            "fr"
        ],
        "country_name": "Lebanon",
        "country_native": "??????????",
        "continent_name": "Asia"
    },
    "LG": {
        "language_name": "Luganda",
        "language_native": "Luganda"
    },
    "LI": {
        "language_name": "Limburgish, Limburgan, Limburger",
        "language_native": "Limburgs",
        "phone": "423",
        "continent": "EU",
        "capital": "Vaduz",
        "currency": "CHF",
        "languages": [
            "de"
        ],
        "country_name": "Liechtenstein",
        "country_native": "Liechtenstein",
        "continent_name": "Europe"
    },
    "LN": {
        "language_name": "Lingala",
        "language_native": "Ling??la"
    },
    "LO": {
        "language_name": "Lao",
        "language_native": "?????????????????????"
    },
    "LT": {
        "language_name": "Lithuanian",
        "language_native": "lietuvi?? kalba",
        "phone": "370",
        "continent": "EU",
        "capital": "Vilnius",
        "currency": "EUR",
        "languages": [
            "lt"
        ],
        "country_name": "Lithuania",
        "country_native": "Lietuva",
        "continent_name": "Europe"
    },
    "LU": {
        "language_name": "Luba-Katanga",
        "language_native": "",
        "phone": "352",
        "continent": "EU",
        "capital": "Luxembourg",
        "currency": "EUR",
        "languages": [
            "fr",
            "de",
            "lb"
        ],
        "country_name": "Luxembourg",
        "country_native": "Luxembourg",
        "continent_name": "Europe"
    },
    "LV": {
        "language_name": "Latvian",
        "language_native": "latvie??u valoda",
        "phone": "371",
        "continent": "EU",
        "capital": "Riga",
        "currency": "EUR",
        "languages": [
            "lv"
        ],
        "country_name": "Latvia",
        "country_native": "Latvija",
        "continent_name": "Europe"
    },
    "GV": {
        "language_name": "Manx",
        "language_native": "Gaelg, Gailck"
    },
    "MK": {
        "language_name": "Macedonian",
        "language_native": "???????????????????? ??????????",
        "phone": "389",
        "continent": "EU",
        "capital": "Skopje",
        "currency": "MKD",
        "languages": [
            "mk"
        ],
        "country_name": "North Macedonia",
        "country_native": "?????????????? ????????????????????",
        "continent_name": "Europe"
    },
    "MG": {
        "language_name": "Malagasy",
        "language_native": "Malagasy fiteny",
        "phone": "261",
        "continent": "AF",
        "capital": "Antananarivo",
        "currency": "MGA",
        "languages": [
            "fr",
            "mg"
        ],
        "country_name": "Madagascar",
        "country_native": "Madagasikara",
        "continent_name": "Africa"
    },
    "MS": {
        "language_name": "Malay",
        "language_native": "bahasa Melayu, ???????? ?????????????",
        "phone": "1664",
        "continent": "NA",
        "capital": "Plymouth",
        "currency": "XCD",
        "languages": [
            "en"
        ],
        "country_name": "Montserrat",
        "country_native": "Montserrat",
        "continent_name": "North America"
    },
    "ML": {
        "language_name": "Malayalam",
        "language_native": "??????????????????",
        "phone": "223",
        "continent": "AF",
        "capital": "Bamako",
        "currency": "XOF",
        "languages": [
            "fr"
        ],
        "country_name": "Mali",
        "country_native": "Mali",
        "continent_name": "Africa"
    },
    "MT": {
        "language_name": "Maltese",
        "language_native": "Malti",
        "phone": "356",
        "continent": "EU",
        "capital": "Valletta",
        "currency": "EUR",
        "languages": [
            "mt",
            "en"
        ],
        "country_name": "Malta",
        "country_native": "Malta",
        "continent_name": "Europe"
    },
    "MI": {
        "language_name": "M??ori",
        "language_native": "te reo M??ori"
    },
    "MR": {
        "language_name": "Marathi (Mar?????h??)",
        "language_native": "???????????????",
        "phone": "222",
        "continent": "AF",
        "capital": "Nouakchott",
        "currency": "MRU",
        "languages": [
            "ar"
        ],
        "country_name": "Mauritania",
        "country_native": "??????????????????",
        "continent_name": "Africa"
    },
    "MH": {
        "language_name": "Marshallese",
        "language_native": "Kajin M??aje??",
        "phone": "692",
        "continent": "OC",
        "capital": "Majuro",
        "currency": "USD",
        "languages": [
            "en",
            "mh"
        ],
        "country_name": "Marshall Islands",
        "country_native": "M??aje??",
        "continent_name": "Oceania"
    },
    "MN": {
        "language_name": "Mongolian",
        "language_native": "????????????",
        "phone": "976",
        "continent": "AS",
        "capital": "Ulan Bator",
        "currency": "MNT",
        "languages": [
            "mn"
        ],
        "country_name": "Mongolia",
        "country_native": "???????????? ??????",
        "continent_name": "Asia"
    },
    "NA": {
        "language_name": "Nauru",
        "language_native": "Ekakair?? Naoero",
        "phone": "264",
        "continent": "AF",
        "capital": "Windhoek",
        "currency": "NAD,ZAR",
        "languages": [
            "en",
            "af"
        ],
        "country_name": "Namibia",
        "country_native": "Namibia",
        "continent_name": "Africa"
    },
    "NV": {
        "language_name": "Navajo, Navaho",
        "language_native": "Din?? bizaad, Din??k??eh????"
    },
    "NB": {
        "language_name": "Norwegian Bokm??l",
        "language_native": "Norsk bokm??l"
    },
    "ND": {
        "language_name": "North Ndebele",
        "language_native": "isiNdebele"
    },
    "NE": {
        "language_name": "Nepali",
        "language_native": "??????????????????",
        "phone": "227",
        "continent": "AF",
        "capital": "Niamey",
        "currency": "XOF",
        "languages": [
            "fr"
        ],
        "country_name": "Niger",
        "country_native": "Niger",
        "continent_name": "Africa"
    },
    "NG": {
        "language_name": "Ndonga",
        "language_native": "Owambo",
        "phone": "234",
        "continent": "AF",
        "capital": "Abuja",
        "currency": "NGN",
        "languages": [
            "en"
        ],
        "country_name": "Nigeria",
        "country_native": "Nigeria",
        "continent_name": "Africa"
    },
    "NN": {
        "language_name": "Norwegian Nynorsk",
        "language_native": "Norsk nynorsk"
    },
    "NO": {
        "language_name": "Norwegian",
        "language_native": "Norsk",
        "phone": "47",
        "continent": "EU",
        "capital": "Oslo",
        "currency": "NOK",
        "languages": [
            "no",
            "nb",
            "nn"
        ],
        "country_name": "Norway",
        "country_native": "Norge",
        "continent_name": "Europe"
    },
    "II": {
        "language_name": "Nuosu",
        "language_native": "????????? Nuosuhxop"
    },
    "NR": {
        "language_name": "South Ndebele",
        "language_native": "isiNdebele",
        "phone": "674",
        "continent": "OC",
        "capital": "Yaren",
        "currency": "AUD",
        "languages": [
            "en",
            "na"
        ],
        "country_name": "Nauru",
        "country_native": "Nauru",
        "continent_name": "Oceania"
    },
    "OC": {
        "language_name": "Occitan",
        "language_native": "Occitan"
    },
    "OJ": {
        "language_name": "Ojibwe, Ojibwa",
        "language_native": "????????????????????????"
    },
    "CU": {
        "language_name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        "language_native": "?????????? ????????????????????",
        "phone": "53",
        "continent": "NA",
        "capital": "Havana",
        "currency": "CUC,CUP",
        "languages": [
            "es"
        ],
        "country_name": "Cuba",
        "country_native": "Cuba",
        "continent_name": "North America"
    },
    "OM": {
        "language_name": "Oromo",
        "language_native": "Afaan Oromoo",
        "phone": "968",
        "continent": "AS",
        "capital": "Muscat",
        "currency": "OMR",
        "languages": [
            "ar"
        ],
        "country_name": "Oman",
        "country_native": "????????",
        "continent_name": "Asia"
    },
    "OR": {
        "language_name": "Oriya",
        "language_native": "???????????????"
    },
    "OS": {
        "language_name": "Ossetian, Ossetic",
        "language_native": "???????? ??????????"
    },
    "PA": {
        "language_name": "Panjabi, Punjabi",
        "language_native": "??????????????????, ???????????????",
        "phone": "507",
        "continent": "NA",
        "capital": "Panama City",
        "currency": "PAB,USD",
        "languages": [
            "es"
        ],
        "country_name": "Panama",
        "country_native": "Panam??",
        "continent_name": "North America"
    },
    "PI": {
        "language_name": "P??li",
        "language_native": "????????????"
    },
    "FA": {
        "language_name": "Persian",
        "language_native": "??????????"
    },
    "PL": {
        "language_name": "Polish",
        "language_native": "polski",
        "phone": "48",
        "continent": "EU",
        "capital": "Warsaw",
        "currency": "PLN",
        "languages": [
            "pl"
        ],
        "country_name": "Poland",
        "country_native": "Polska",
        "continent_name": "Europe"
    },
    "PS": {
        "language_name": "Pashto, Pushto",
        "language_native": "????????",
        "phone": "970",
        "continent": "AS",
        "capital": "Ramallah",
        "currency": "ILS",
        "languages": [
            "ar"
        ],
        "country_name": "Palestine",
        "country_native": "????????????",
        "continent_name": "Asia"
    },
    "PT": {
        "language_name": "Portuguese",
        "language_native": "Portugu??s",
        "phone": "351",
        "continent": "EU",
        "capital": "Lisbon",
        "currency": "EUR",
        "languages": [
            "pt"
        ],
        "country_name": "Portugal",
        "country_native": "Portugal",
        "continent_name": "Europe"
    },
    "QU": {
        "language_name": "Quechua",
        "language_native": "Runa Simi, Kichwa"
    },
    "RM": {
        "language_name": "Romansh",
        "language_native": "rumantsch grischun"
    },
    "RN": {
        "language_name": "Kirundi",
        "language_native": "kiRundi"
    },
    "RO": {
        "language_name": "Romanian, Moldavian, Moldovan",
        "language_native": "rom??n??",
        "phone": "40",
        "continent": "EU",
        "capital": "Bucharest",
        "currency": "RON",
        "languages": [
            "ro"
        ],
        "country_name": "Romania",
        "country_native": "Rom??nia",
        "continent_name": "Europe"
    },
    "RU": {
        "language_name": "Russian",
        "language_native": "?????????????? ????????",
        "phone": "7",
        "continent": "EU",
        "capital": "Moscow",
        "currency": "RUB",
        "languages": [
            "ru"
        ],
        "country_name": "Russia",
        "country_native": "????????????",
        "continent_name": "Europe"
    },
    "SA": {
        "language_name": "Sanskrit (Sa???sk???ta)",
        "language_native": "???????????????????????????",
        "phone": "966",
        "continent": "AS",
        "capital": "Riyadh",
        "currency": "SAR",
        "languages": [
            "ar"
        ],
        "country_name": "Saudi Arabia",
        "country_native": "?????????????? ????????????????",
        "continent_name": "Asia"
    },
    "SC": {
        "language_name": "Sardinian",
        "language_native": "sardu",
        "phone": "248",
        "continent": "AF",
        "capital": "Victoria",
        "currency": "SCR",
        "languages": [
            "fr",
            "en"
        ],
        "country_name": "Seychelles",
        "country_native": "Seychelles",
        "continent_name": "Africa"
    },
    "SD": {
        "language_name": "Sindhi",
        "language_native": "??????????????????, ?????????? ?????????????",
        "phone": "249",
        "continent": "AF",
        "capital": "Khartoum",
        "currency": "SDG",
        "languages": [
            "ar",
            "en"
        ],
        "country_name": "Sudan",
        "country_native": "??????????????",
        "continent_name": "Africa"
    },
    "SE": {
        "language_name": "Northern Sami",
        "language_native": "Davvis??megiella",
        "phone": "46",
        "continent": "EU",
        "capital": "Stockholm",
        "currency": "SEK",
        "languages": [
            "sv"
        ],
        "country_name": "Sweden",
        "country_native": "Sverige",
        "continent_name": "Europe"
    },
    "SM": {
        "language_name": "Samoan",
        "language_native": "gagana faa Samoa",
        "phone": "378",
        "continent": "EU",
        "capital": "City of San Marino",
        "currency": "EUR",
        "languages": [
            "it"
        ],
        "country_name": "San Marino",
        "country_native": "San Marino",
        "continent_name": "Europe"
    },
    "SG": {
        "language_name": "Sango",
        "language_native": "y??ng?? t?? s??ng??",
        "phone": "65",
        "continent": "AS",
        "capital": "Singapore",
        "currency": "SGD",
        "languages": [
            "en",
            "ms",
            "ta",
            "zh"
        ],
        "country_name": "Singapore",
        "country_native": "Singapore",
        "continent_name": "Asia"
    },
    "SR": {
        "language_name": "Serbian",
        "language_native": "???????????? ??????????",
        "phone": "597",
        "continent": "SA",
        "capital": "Paramaribo",
        "currency": "SRD",
        "languages": [
            "nl"
        ],
        "country_name": "Suriname",
        "country_native": "Suriname",
        "continent_name": "South America"
    },
    "GD": {
        "language_name": "Scottish Gaelic; Gaelic",
        "language_native": "G??idhlig",
        "phone": "1473",
        "continent": "NA",
        "capital": "St. George's",
        "currency": "XCD",
        "languages": [
            "en"
        ],
        "country_name": "Grenada",
        "country_native": "Grenada",
        "continent_name": "North America"
    },
    "SN": {
        "language_name": "Shona",
        "language_native": "chiShona",
        "phone": "221",
        "continent": "AF",
        "capital": "Dakar",
        "currency": "XOF",
        "languages": [
            "fr"
        ],
        "country_name": "Senegal",
        "country_native": "S??n??gal",
        "continent_name": "Africa"
    },
    "SI": {
        "language_name": "Sinhala, Sinhalese",
        "language_native": "???????????????",
        "phone": "386",
        "continent": "EU",
        "capital": "Ljubljana",
        "currency": "EUR",
        "languages": [
            "sl"
        ],
        "country_name": "Slovenia",
        "country_native": "Slovenija",
        "continent_name": "Europe"
    },
    "SK": {
        "language_name": "Slovak",
        "language_native": "sloven??ina",
        "phone": "421",
        "continent": "EU",
        "capital": "Bratislava",
        "currency": "EUR",
        "languages": [
            "sk"
        ],
        "country_name": "Slovakia",
        "country_native": "Slovensko",
        "continent_name": "Europe"
    },
    "SL": {
        "language_name": "Slovene",
        "language_native": "sloven????ina",
        "phone": "232",
        "continent": "AF",
        "capital": "Freetown",
        "currency": "SLL",
        "languages": [
            "en"
        ],
        "country_name": "Sierra Leone",
        "country_native": "Sierra Leone",
        "continent_name": "Africa"
    },
    "SO": {
        "language_name": "Somali",
        "language_native": "Soomaaliga, af Soomaali",
        "phone": "252",
        "continent": "AF",
        "capital": "Mogadishu",
        "currency": "SOS",
        "languages": [
            "so",
            "ar"
        ],
        "country_name": "Somalia",
        "country_native": "Soomaaliya",
        "continent_name": "Africa"
    },
    "ST": {
        "language_name": "Southern Sotho",
        "language_native": "Sesotho",
        "phone": "239",
        "continent": "AF",
        "capital": "S??o Tom??",
        "currency": "STN",
        "languages": [
            "pt"
        ],
        "country_name": "S??o Tom?? and Pr??ncipe",
        "country_native": "S??o Tom?? e Pr??ncipe",
        "continent_name": "Africa"
    },
    "ES": {
        "language_name": "Spanish; Castilian",
        "language_native": "espa??ol, castellano",
        "phone": "34",
        "continent": "EU",
        "capital": "Madrid",
        "currency": "EUR",
        "languages": [
            "es",
            "eu",
            "ca",
            "gl",
            "oc"
        ],
        "country_name": "Spain",
        "country_native": "Espa??a",
        "continent_name": "Europe"
    },
    "SU": {
        "language_name": "Sundanese",
        "language_native": "Basa Sunda"
    },
    "SW": {
        "language_name": "Swahili",
        "language_native": "Kiswahili"
    },
    "SS": {
        "language_name": "Swati",
        "language_native": "SiSwati",
        "phone": "211",
        "continent": "AF",
        "capital": "Juba",
        "currency": "SSP",
        "languages": [
            "en"
        ],
        "country_name": "South Sudan",
        "country_native": "South Sudan",
        "continent_name": "Africa"
    },
    "SV": {
        "language_name": "Swedish",
        "language_native": "svenska",
        "phone": "503",
        "continent": "NA",
        "capital": "San Salvador",
        "currency": "SVC,USD",
        "languages": [
            "es"
        ],
        "country_name": "El Salvador",
        "country_native": "El Salvador",
        "continent_name": "North America"
    },
    "TA": {
        "language_name": "Tamil",
        "language_native": "???????????????"
    },
    "TE": {
        "language_name": "Telugu",
        "language_native": "??????????????????"
    },
    "TG": {
        "language_name": "Tajik",
        "language_native": "????????????, to??ik??, ???????????????",
        "phone": "228",
        "continent": "AF",
        "capital": "Lom??",
        "currency": "XOF",
        "languages": [
            "fr"
        ],
        "country_name": "Togo",
        "country_native": "Togo",
        "continent_name": "Africa"
    },
    "TH": {
        "language_name": "Thai",
        "language_native": "?????????",
        "phone": "66",
        "continent": "AS",
        "capital": "Bangkok",
        "currency": "THB",
        "languages": [
            "th"
        ],
        "country_name": "Thailand",
        "country_native": "???????????????????????????",
        "continent_name": "Asia"
    },
    "TI": {
        "language_name": "Tigrinya",
        "language_native": "????????????"
    },
    "BO": {
        "language_name": "Tibetan Standard, Tibetan, Central",
        "language_native": "?????????????????????",
        "phone": "591",
        "continent": "SA",
        "capital": "Sucre",
        "currency": "BOB,BOV",
        "languages": [
            "es",
            "ay",
            "qu"
        ],
        "country_name": "Bolivia",
        "country_native": "Bolivia",
        "continent_name": "South America"
    },
    "TK": {
        "language_name": "Turkmen",
        "language_native": "T??rkmen, ??????????????",
        "phone": "690",
        "continent": "OC",
        "capital": "Fakaofo",
        "currency": "NZD",
        "languages": [
            "en"
        ],
        "country_name": "Tokelau",
        "country_native": "Tokelau",
        "continent_name": "Oceania"
    },
    "TL": {
        "language_name": "Tagalog",
        "language_native": "Wikang Tagalog, ??????????????? ??????????????????",
        "phone": "670",
        "continent": "OC",
        "capital": "Dili",
        "currency": "USD",
        "languages": [
            "pt"
        ],
        "country_name": "East Timor",
        "country_native": "Timor-Leste",
        "continent_name": "Oceania"
    },
    "TN": {
        "language_name": "Tswana",
        "language_native": "Setswana",
        "phone": "216",
        "continent": "AF",
        "capital": "Tunis",
        "currency": "TND",
        "languages": [
            "ar"
        ],
        "country_name": "Tunisia",
        "country_native": "????????",
        "continent_name": "Africa"
    },
    "TO": {
        "language_name": "Tonga (Tonga Islands)",
        "language_native": "faka Tonga",
        "phone": "676",
        "continent": "OC",
        "capital": "Nuku'alofa",
        "currency": "TOP",
        "languages": [
            "en",
            "to"
        ],
        "country_name": "Tonga",
        "country_native": "Tonga",
        "continent_name": "Oceania"
    },
    "TR": {
        "language_name": "Turkish",
        "language_native": "T??rk??e",
        "phone": "90",
        "continent": "AS",
        "capital": "Ankara",
        "currency": "TRY",
        "languages": [
            "tr"
        ],
        "country_name": "Turkey",
        "country_native": "T??rkiye",
        "continent_name": "Asia"
    },
    "TS": {
        "language_name": "Tsonga",
        "language_native": "Xitsonga"
    },
    "TT": {
        "language_name": "Tatar",
        "language_native": "??????????????, tatar??a, ?????????????????",
        "phone": "1868",
        "continent": "NA",
        "capital": "Port of Spain",
        "currency": "TTD",
        "languages": [
            "en"
        ],
        "country_name": "Trinidad and Tobago",
        "country_native": "Trinidad and Tobago",
        "continent_name": "North America"
    },
    "TW": {
        "language_name": "Twi",
        "language_native": "Twi",
        "phone": "886",
        "continent": "AS",
        "capital": "Taipei",
        "currency": "TWD",
        "languages": [
            "zh"
        ],
        "country_name": "Taiwan",
        "country_native": "??????",
        "continent_name": "Asia"
    },
    "TY": {
        "language_name": "Tahitian",
        "language_native": "Reo Tahiti"
    },
    "UG": {
        "language_name": "Uighur, Uyghur",
        "language_native": "Uy??urq??, ???????????????????",
        "phone": "256",
        "continent": "AF",
        "capital": "Kampala",
        "currency": "UGX",
        "languages": [
            "en",
            "sw"
        ],
        "country_name": "Uganda",
        "country_native": "Uganda",
        "continent_name": "Africa"
    },
    "UK": {
        "language_name": "Ukrainian",
        "language_native": "????????????????????"
    },
    "UR": {
        "language_name": "Urdu",
        "language_native": "????????"
    },
    "UZ": {
        "language_name": "Uzbek",
        "language_native": "zbek, ??????????, ???????????????",
        "phone": "998",
        "continent": "AS",
        "capital": "Tashkent",
        "currency": "UZS",
        "languages": [
            "uz",
            "ru"
        ],
        "country_name": "Uzbekistan",
        "country_native": "O???zbekiston",
        "continent_name": "Asia"
    },
    "VE": {
        "language_name": "Venda",
        "language_native": "Tshiven???a",
        "phone": "58",
        "continent": "SA",
        "capital": "Caracas",
        "currency": "VES",
        "languages": [
            "es"
        ],
        "country_name": "Venezuela",
        "country_native": "Venezuela",
        "continent_name": "South America"
    },
    "VI": {
        "language_name": "Vietnamese",
        "language_native": "Ti???ng Vi???t",
        "phone": "1340",
        "continent": "NA",
        "capital": "Charlotte Amalie",
        "currency": "USD",
        "languages": [
            "en"
        ],
        "country_name": "U.S. Virgin Islands",
        "country_native": "United States Virgin Islands",
        "continent_name": "North America"
    },
    "VO": {
        "language_name": "Volap??k",
        "language_native": "Volap??k"
    },
    "WA": {
        "language_name": "Walloon",
        "language_native": "Walon"
    },
    "CY": {
        "language_name": "Welsh",
        "language_native": "Cymraeg",
        "phone": "357",
        "continent": "EU",
        "capital": "Nicosia",
        "currency": "EUR",
        "languages": [
            "el",
            "tr",
            "hy"
        ],
        "country_name": "Cyprus",
        "country_native": "????????????",
        "continent_name": "Europe"
    },
    "WO": {
        "language_name": "Wolof",
        "language_native": "Wollof"
    },
    "FY": {
        "language_name": "Western Frisian",
        "language_native": "Frysk"
    },
    "XH": {
        "language_name": "Xhosa",
        "language_native": "isiXhosa"
    },
    "YI": {
        "language_name": "Yiddish",
        "language_native": "????????????"
    },
    "YO": {
        "language_name": "Yoruba",
        "language_native": "Yor??b??"
    },
    "ZA": {
        "language_name": "Zhuang, Chuang",
        "language_native": "Sa?? cue????, Saw cuengh",
        "phone": "27",
        "continent": "AF",
        "capital": "Pretoria",
        "currency": "ZAR",
        "languages": [
            "af",
            "en",
            "nr",
            "st",
            "ss",
            "tn",
            "ts",
            "ve",
            "xh",
            "zu"
        ],
        "country_name": "South Africa",
        "country_native": "South Africa",
        "continent_name": "Africa"
    }
}
String.prototype.capitalize = function () {
    return this.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

function getCountryName(countryCode) {
    countryCode = countryCode.toUpperCase();
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

function getCountryLanguage(countryCode) {
    if (lang.hasOwnProperty(countryCode)) {
        return lang[countryCode].name;
    }
}
function getNativeCountryLanguage(countryCode) {
    if (lang.hasOwnProperty(countryCode)) {
        return lang[countryCode].nativeName;
    }
}

function getCountryCode(countryName) {
    var isoCountries = swap(isoCountries), countryName = countryName.capitalize();
    if (isoCountries.hasOwnProperty(countryName)) {
        return isoCountries[countryName];
    } else {
        return countryName;
    }
}
function swap(json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}
function loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}