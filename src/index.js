import $ from 'jquery';

import css from './css/index.css';
import sass from './sass/index.scss';

document.write('dfafdasfdasafdsasdf');
let add=(x,y)=>x+y;
$('#div1').css({"width":"300px","height":"500px","background":"red"});
let json = require('../author.json');
document.querySelector('#json').innnerHTML = '作者：${json.name},年龄：${json.age},学校：${json.school}';
