"use strict";function setLookup(){for(i=0;i<platforms.length;i++)lookup[platforms[i].searchableName]=platforms[i]}function getVariantObject(e){var t="";return variants.forEach(function(a){a.searchableName===e&&(t=a)}),t}function getSearchableName(e){var t=null;return platforms.forEach(function(a){e.indexOf(a.searchableName)>=0&&(t=a.searchableName)}),t||null}function getOfficialName(e){return lookup[e].officialName}function getPlatformOrder(e){return platforms.findIndex(function(t){return t.searchableName==e})}function orderPlatforms(e){function t(e,t){return e.thisPlatformOrder<t.thisPlatformOrder?-1:e.thisPlatformOrder>t.thisPlatformOrder?1:0}return e.sort(t)}function getBinaryExt(e){return lookup[e].binaryExtension}function getInstallerExt(e){return lookup[e].installerExtension}function getLogo(e){return logoPath+lookup[e].logo}function getInstallCommand(e){return lookup[e].installCommand}function getChecksumCommand(e){return lookup[e].checksumCommand}function getPathCommand(e){return lookup[e].pathCommand}function detectOS(){var e=null;return platforms.forEach(function(t){var a=t.osDetectionString.toUpperCase(),n=platform.os.family.toUpperCase();a.indexOf(n)>=0&&(e=t)}),e||null}function loadJSON(e,t,a){var n="https://raw.githubusercontent.com/AdoptOpenJDK/"+e+"/master/"+t+".json";"adoptopenjdk.net"===e&&(n=t);var i=new XMLHttpRequest;i.open("GET",n,!0),i.onreadystatechange=function(){if(4==i.readyState&&"200"==i.status)a(i.responseText);else if("200"!=i.status&&"0"!=i.status)if("jck"!==t){if("404"==i.status){var n=window.location.href,r=new URL(n),o=r.searchParams.get("variant");document.getElementById("error-container").innerHTML="<p>There are no releases available for "+o+". Please check our <a href=nightly.html?variant="+o+" target='blank'>Nightly Builds</a>.</p>"}else document.getElementById("error-container").innerHTML="<p>Error... there's a problem fetching the releases. Please see the <a href='https://github.com/AdoptOpenJDK/openjdk-"+e+"/releases' target='blank'>releases list on GitHub</a>.</p>";loading.innerHTML=""}else loading.innerHTML="",a(null)},i.send(null)}function loadPlatformsThenData(e){loadJSON("adoptopenjdk.net","./dist/json/config.json",function(t){var a=JSON.parse(t);void 0!==a?(platforms=a.platforms,variants=a.variants,setVariantSelector(),setLookup(),e()):(errorContainer.innerHTML="<p>Error... there's a problem fetching the releases. Please see the <a href='https://github.com/AdoptOpenJDK/openjdk-releases/releases' target='blank'>releases list on GitHub</a>.</p>",loading.innerHTML="")})}function setTickLink(){var e=document.getElementsByClassName("tick");for(i=0;i<e.length;i++)e[i].addEventListener("click",function(e){var t=window.open("https://en.wikipedia.org/wiki/Technology_Compatibility_Kit","_blank");t?t.focus():alert("New tab blocked - please allow popups."),e.preventDefault()})}function setUrlQuery(e,t){if(window.location.search.indexOf(e)>=0){var a=getQueryByName(e);window.location.search=window.location.search.replace(a,t)}else window.location.search+=e+"="+t}function getQueryByName(e){var t=window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),n=a.exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function persistUrlQuery(){var e="",t=Array.apply(null,document.getElementsByTagName("a")),a=window.location.hostname;"localhost"!=a&&(a="https://"+a),t.forEach(function(t){t.href.indexOf(a)>=0&&(t.href.indexOf("#")>-1?(e="#"+t.href.split("#").pop(),t.href=t.href.substr(0,t.href.indexOf("#")),t.href.indexOf("?")>-1&&(t.href=t.href.substr(0,t.href.indexOf("?"))),t.href=t.href+window.location.search+e):t.href=t.href+window.location.search)})}function setVariantSelector(){if(variantSelector){if(0===variantSelector.options.length&&variants.forEach(function(e){var t=new Option;t.value=e.searchableName,t.text=e.officialName,t.description=e.description,t.descriptionLink=e.descriptionLink,variantSelector.options.add(t),!variant&&e.default&&(variant=t.value)}),variant||(variant=variants[0].searchableName),variantSelector.value=variant,""===variantSelector.value){var e=new Option;e.value="unknown",e.text="Select a variant",variantSelector.options.add(e),variantSelector.value="unknown",errorContainer.innerHTML="<p>Error: no such variant. Please select a valid variant from the drop-down list.</p>"}variantSelector.onchange=function(){setUrlQuery("variant",variantSelector.value)}}}function copyClipboard(e){var t=$("<input>");$("body").append(t),t.val($(e).text()).select(),document.execCommand("copy"),t.remove(),alert("Copied to clipboard")}function highlightCode(){hljs.initHighlightingOnLoad()}function onArchiveLoad(){ARCHIVEDATA=new Object,populateArchive()}function populateArchive(){loadPlatformsThenData(function(){var e=variant+"-releases";loadJSON(e,"releases",function(t){function a(e){return!1===e.prerelease&&e.assets[0]}var n=JSON.parse(t).filter(a);void 0!==n[0]?loadJSON(e,"jck",function(e){var t={};null!==e&&(t=JSON.parse(e)),buildArchiveHTML(n,t)}):(loading.innerHTML="",errorContainer.innerHTML="<p>There are no archived releases yet! See the <a href='./releases.html?variant="+variant+"'>Latest release</a> page.</p>")})})}function buildArchiveHTML(e,t){var a=[];e.forEach(function(e){var n=new Object,i=[],r=e.published_at;n.thisReleaseName=e.name,n.thisReleaseDay=moment(r).format("D"),n.thisReleaseMonth=moment(r).format("MMMM"),n.thisReleaseYear=moment(r).format("YYYY"),n.thisGitLink="https://github.com/AdoptOpenJDK/"+variant+"-releases/releases/tag/"+n.thisReleaseName;var o=[];e.assets.forEach(function(e){o.push(e)}),o.forEach(function(a){var r=new Object,o=a.name,l=o.toUpperCase();if(r.thisPlatform=getSearchableName(l),r.thisPlatform){if(r.thisInstallerExtension=getInstallerExt(r.thisPlatform),r.thisBinaryExtension=getBinaryExt(r.thisPlatform),l.indexOf(r.thisInstallerExtension.toUpperCase())>=0&&(i.length>0&&i.forEach(function(e){e.thisPlatform===r.thisPlatform&&i.pop()}),r.thisPlatformExists=!0,r.thisInstallerExists=!0,n.installersExist=!0,r.thisInstallerLink=a.browser_download_url,r.thisInstallerSize=Math.floor(a.size/1024/1024),r.thisOfficialName=getOfficialName(r.thisPlatform),r.thisBinaryExists=!0,n.binariesExist=!0,r.thisBinaryLink=a.browser_download_url.replace(r.thisInstallerExtension,r.thisBinaryExtension),r.thisBinarySize=Math.floor(a.size/1024/1024),r.thisChecksumLink=a.browser_download_url.replace(r.thisInstallerExtension,".sha256.txt"),r.thisPlatformOrder=getPlatformOrder(r.thisPlatform),0==Object.keys(t).length?r.thisVerified=!1:t[e.name]&&t[e.name].hasOwnProperty(r.thisPlatform)?r.thisVerified=!0:r.thisVerified=!1),l.indexOf(r.thisBinaryExtension.toUpperCase())>=0){var s=!1;i.length>0&&i.forEach(function(e){e.thisPlatform===r.thisPlatform&&(s=!0)}),s||(r.thisPlatformExists=!0,r.thisBinaryExists=!0,n.binariesExist=!0,r.thisOfficialName=getOfficialName(r.thisPlatform),r.thisBinaryLink=a.browser_download_url,r.thisBinarySize=Math.floor(a.size/1024/1024),r.thisChecksumLink=a.browser_download_url.replace(r.thisBinaryExtension,".sha256.txt"),r.thisPlatformOrder=getPlatformOrder(r.thisPlatform),0==Object.keys(t).length?r.thisVerified=!1:t[e.name]&&t[e.name].hasOwnProperty(r.thisPlatform)?r.thisVerified=!0:r.thisVerified=!1)}!0===r.thisPlatformExists&&i.push(r)}}),i=orderPlatforms(i),n.thisPlatformAssets=i,a.push(n)}),console.log(a),ARCHIVEDATA.htmlTemplate=a;var n=Handlebars.compile(document.getElementById("template").innerHTML);document.getElementById("archive-table-body").innerHTML=n(ARCHIVEDATA),setPagination(),setTickLink(),loading.innerHTML="";var i=document.getElementById("archive-list");i.className=i.className.replace(/(?:^|\s)hide(?!\S)/g," animated fadeIn ")}function setPagination(){var e=$("#pagination-container"),t=document.getElementById("archive-table-body").getElementsByClassName("release-row"),a=[];for(i=0;i<t.length;i++)a.push(t[i].outerHTML);var n={dataSource:a,pageSize:5,callback:function(e){var t="";$.each(e,function(e,a){t+=a}),$("#archive-table-body").html(t)}};return e.pagination(n),document.getElementById("pagination-container").getElementsByTagName("li").length<=3&&document.getElementById("pagination-container").classList.add("hide"),e}function onIndexLoad(){setDownloadSection()}function setDownloadSection(){loadPlatformsThenData(function(){var e=variant+"-releases";loadJSON(e,"latest_release",function(t){if("undefined"!==t){var a=JSON.parse(t);void 0!==a?loadJSON(e,"jck",function(e){var t={};null!==e&&(t=JSON.parse(e)),buildHomepageHTML(a,t)}):(errorContainer.innerHTML="<p>There are no releases available for "+variant+". Please check our <a href=nightly.html?variant="+variant+" target='blank'>Nightly Builds</a>.</p>",loading.innerHTML="")}else errorContainer.innerHTML="<p>There are no releases available for "+variant+". Please check our <a href=nightly.html?variant="+variant+" target='blank'>Nightly Builds</a>.</p>",loading.innerHTML=""})})}function buildHomepageHTML(e,t){dlVersionText.innerHTML=e.tag_name;var a=[];e.assets.forEach(function(e){a.push(e)});var n=detectOS(),i=null;if(n&&a.forEach(function(a){var r=a.name,o=r.toUpperCase(),l=getSearchableName(o),s=null;if(l){var c=getBinaryExt(l),m=getInstallerExt(l);null==i&&(o.indexOf(m.toUpperCase())>=0?(s=n.searchableName.toUpperCase(),0!=Object.keys(t).length&&t[e.tag_name]&&t[e.tag_name].hasOwnProperty(s)&&(document.getElementById("jck-approved-tick").classList.remove("hide"),setTickLink()),o.indexOf(s)>=0&&(i=a)):o.indexOf(c.toUpperCase())>=0&&(s=n.searchableName.toUpperCase(),0!=Object.keys(t).length&&t[e.tag_name]&&t[e.tag_name].hasOwnProperty(s)&&(document.getElementById("jck-approved-tick").classList.remove("hide"),setTickLink()),o.indexOf(s)>=0&&(i=a)))}}),i){dlLatest.href=i.browser_download_url,dlText.innerHTML="Download for <var platform-name>"+n.officialName+"</var>";var r=Math.floor(i.size/1024/1024);dlVersionText.innerHTML+=" - "+r+" MB"}else dlOther.classList.add("hide"),dlIcon.classList.add("hide"),dlIcon2.classList.remove("hide"),dlText.innerHTML="Downloads",dlLatest.href="./releases.html?variant="+variant;loading.classList.add("hide"),dlLatest.className=dlLatest.className.replace(/(?:^|\s)invisible(?!\S)/g," animated "),dlOther.className=dlOther.className.replace(/(?:^|\s)invisible(?!\S)/g," animated "),dlArchive.className=dlArchive.className.replace(/(?:^|\s)invisible(?!\S)/g," animated "),dlLatest.onclick=function(){document.getElementById("installation-link").className+=" animated pulse infinite transition-bright"},setTimeout(function(){dlLatest.className="dl-button a-button animated pulse"},1e3)}function onInstallationLoad(){INSTALLDATA=new Object,populateInstallation()}function populateInstallation(){loadPlatformsThenData(function(){loadJSON(variant+"-releases","latest_release",function(e){var t=JSON.parse(e);void 0!==t?buildInstallationHTML(t):(errorContainer.innerHTML="<p>Error... no installation information has been found!</p>",loading.innerHTML="")})})}function buildInstallationHTML(e){var t=[];e.assets.forEach(function(e){t.push(e)});var a=[];t.forEach(function(t){var n=new Object,i=t.name,r=i.toUpperCase();n.thisPlatform=getSearchableName(r),n.thisPlatform&&(n.thisPlatformOrder=getPlatformOrder(n.thisPlatform),n.thisOfficialName=getOfficialName(n.thisPlatform),n.thisBinaryExtension=getBinaryExt(n.thisPlatform),r.indexOf(n.thisBinaryExtension.toUpperCase())>=0&&(n.thisPlatformExists=!0,n.thisBinaryLink=t.browser_download_url,n.thisBinaryFilename=t.name,n.thisChecksumLink=t.browser_download_url.replace(n.thisBinaryExtension,".sha256.txt"),n.thisChecksumFilename=t.name.replace(n.thisBinaryExtension,".sha256.txt"),n.thisUnzipCommand=getInstallCommand(n.thisPlatform).replace("FILENAME",n.thisBinaryFilename),n.thisChecksumCommand=getChecksumCommand(n.thisPlatform).replace("FILENAME",n.thisBinaryFilename),n.thisPathCommand=getPathCommand(n.thisPlatform).replace("DIRNAME",e.name)),!0===n.thisPlatformExists&&a.push(n))}),a=orderPlatforms(a),INSTALLDATA.htmlTemplate=a;var n=Handlebars.compile(document.getElementById("template").innerHTML);document.getElementById("installation-template").innerHTML=n(INSTALLDATA),setInstallationPlatformSelector(a),window.onhashchange=displayInstallPlatform,loading.innerHTML="";var i=document.getElementById("installation-container");i.className=i.className.replace(/(?:^|\s)hide(?!\S)/g," animated fadeIn ")}function displayInstallPlatform(){var e=window.location.hash.substr(1).toUpperCase(),t=document.getElementById("installation-container-"+e);if(unselectInstallPlatform(),t)platformSelector.value=e,t.classList.remove("hide");else{var a=[];if(Array.apply(null,platformSelector.options).forEach(function(e){a.push(e.value)}),-1===a.indexOf("unknown")){var n=new Option;n.value="unknown",n.text="Select a platform",platformSelector.options.add(n,0)}platformSelector.value="unknown"}}function unselectInstallPlatform(){var e=document.getElementById("installation-container").getElementsByClassName("installation-single-platform");for(i=0;i<e.length;i++)e[i].classList.add("hide")}function setInstallationPlatformSelector(e){if(platformSelector){0===platformSelector.options.length&&e.forEach(function(e){var t=new Option;t.value=e.thisPlatform,t.text=e.thisOfficialName,platformSelector.options.add(t)});var t=detectOS();t&&window.location.hash.length<1?(platformSelector.value=t.searchableName,window.location.hash=platformSelector.value.toLowerCase(),displayInstallPlatform()):displayInstallPlatform(),platformSelector.onchange=function(){window.location.hash=platformSelector.value.toLowerCase(),displayInstallPlatform()}}}function onNightlyLoad(){NIGHTLYDATA=new Object,setDatePicker(),populateNightly(),numberpicker.onchange=function(){setTableRange()},datepicker.onchange=function(){setTableRange()}}function setDatePicker(){$(datepicker).datepicker();var e=moment().format("MM/DD/YYYY");datepicker.value=e}function populateNightly(){loadPlatformsThenData(function(){loadJSON(variant+"-nightly","nightly",function(e){function t(e){return!1===e.prerelease&&e.assets[0]}var a=JSON.parse(e).filter(t);void 0!==a[0]?buildNightlyHTML(a):(errorContainer.innerHTML="<p>Error... no releases have been found!</p>",loading.innerHTML="")})})}function buildNightlyHTML(e){tableHead.innerHTML="<tr id='table-header'><th>Release</th><th>Date</th><th>Platform</th><th>Binary</th><th>Checksum</th></tr>";var t=[];e.forEach(function(e){var a=[];e.assets.forEach(function(e){a.push(e)}),a.forEach(function(a){var n=new Object,i=a.name,r=i.toUpperCase();if(n.thisPlatform=getSearchableName(r),n.thisPlatform&&(n.thisBinaryExtension=getBinaryExt(n.thisPlatform),r.indexOf(n.thisBinaryExtension.toUpperCase())>=0)){var o=e.published_at;n.thisReleaseName=e.name.slice(0,12),n.thisReleaseDay=moment(o).format("D"),n.thisReleaseMonth=moment(o).format("MMMM"),n.thisReleaseYear=moment(o).format("YYYY"),n.thisGitLink="https://github.com/AdoptOpenJDK/"+variant+"-nightly/releases/tag/"+e.name,n.thisOfficialName=getOfficialName(n.thisPlatform),n.thisBinaryLink=a.browser_download_url,n.thisBinarySize=Math.floor(a.size/1024/1024),n.thisChecksumLink=a.browser_download_url.replace(n.thisBinaryExtension,".sha256.txt"),t.push(n)}})}),NIGHTLYDATA.htmlTemplate=t;var a=Handlebars.compile(document.getElementById("template").innerHTML);nightlyList.innerHTML=a(NIGHTLYDATA),setSearchLogic(),loading.innerHTML="",nightlyList.className=nightlyList.className.replace(/(?:^|\s)hide(?!\S)/g," animated fadeIn "),setTableRange();var n=document.getElementById("scroll-text");document.getElementById("nightly-list").clientWidth!=document.getElementById("nightly-list").scrollWidth&&(n.className=n.className.replace(/(?:^|\s)hide(?!\S)/g,""))}function setTableRange(){var e=$("#nightly-table tr"),t=moment(datepicker.value,"MM-DD-YYYY").format(),a=0;for(i=0;i<e.length;i++){var n=e[i].getElementsByClassName("nightly-release-date")[0].innerHTML,r=moment(n,"D MMMM YYYY").format();!0===moment(r).isAfter(t)||a>=numberpicker.value?e[i].classList.add("hide"):(e[i].classList.remove("hide"),a++)}checkSearchResultsExist()}function setSearchLogic(){var e=$("#nightly-table tr");$("#search").keyup(function(){var t,a="^(?=.*"+$.trim($(this).val()).split(/\s+/).join(")(?=.*")+").*$",n=RegExp(a,"i");e.show().filter(function(){return t=$(this).text().replace(/\s+/g," "),!n.test(t)}).hide(),checkSearchResultsExist()})}function checkSearchResultsExist(){0==$("#nightly-table").find("tr:visible").length?(tableContainer.style.visibility="hidden",searchError.className=""):(tableContainer.style.visibility="",searchError.className="hide")}function onLatestLoad(){RELEASEDATA=new Object,populateLatest()}function populateLatest(){loadPlatformsThenData(function(){var e=variant+"-releases";loadJSON(e,"latest_release",function(t){if("undefined"===t)errorContainer.innerHTML="<p>There are no releases available for "+variant+". Please check our <a href=nightly.html?variant="+variant+" target='blank'>Nightly Builds</a>.</p>",loading.innerHTML="";else{var a=JSON.parse(t);void 0!==a?loadJSON(e,"jck",function(e){var t={};null!==e&&(t=JSON.parse(e)),buildLatestHTML(a,t)}):(errorContainer.innerHTML="<p>Error... no releases have been found!</p>",loading.innerHTML="")}})})}function buildLatestHTML(e,t){var a=getVariantObject(variant);a.descriptionLink&&(document.getElementById("description_header").innerHTML="What is "+a.description+"?",document.getElementById("description_link").innerHTML="Find out here",document.getElementById("description_link").href=a.descriptionLink);var n=e.published_at;document.getElementById("latest-build-name").innerHTML="<var release-name>"+e.name+"</var>",document.getElementById("latest-build-name").href="https://github.com/AdoptOpenJDK/"+variant+"-releases/releases/tag/"+e.name,document.getElementById("latest-date").innerHTML="<var>"+moment(n).format("D")+"</var> "+moment(n).format("MMMM")+" <var>"+moment(n).format("YYYY")+"</var>",document.getElementById("latest-timestamp").innerHTML=n.slice(0,4)+n.slice(8,10)+n.slice(5,7)+n.slice(11,13)+n.slice(14,16);var i=[];e.assets.forEach(function(e){i.push(e)});var r=[];i.forEach(function(a){var n=new Object,i=a.name,o=i.toUpperCase();if(n.thisPlatform=getSearchableName(o),n.thisPlatform){if(n.thisLogo=getLogo(n.thisPlatform),n.thisPlatformOrder=getPlatformOrder(n.thisPlatform),n.thisOfficialName=getOfficialName(n.thisPlatform),0==Object.keys(t).length?n.thisVerified=!1:t[e.name]&&t[e.name].hasOwnProperty(n.thisPlatform)?n.thisVerified=!0:n.thisVerified=!1,n.thisInstallerExtension=getInstallerExt(n.thisPlatform),n.thisBinaryExtension=getBinaryExt(n.thisPlatform),o.indexOf(n.thisInstallerExtension.toUpperCase())>=0&&(r.length>0&&r.forEach(function(e){e.thisPlatform===n.thisPlatform&&r.pop()}),n.thisPlatformExists=!0,n.thisInstallerExists=!0,n.thisInstallerLink=a.browser_download_url,n.thisInstallerSize=Math.floor(a.size/1024/1024),n.thisBinaryExists=!0,n.thisBinaryLink=a.browser_download_url.replace(n.thisInstallerExtension,n.thisBinaryExtension),n.thisBinarySize=Math.floor(a.size/1024/1024),n.thisChecksumLink=a.browser_download_url.replace(n.thisInstallerExtension,".sha256.txt")),o.indexOf(n.thisBinaryExtension.toUpperCase())>=0){var l=!1;r.length>0&&r.forEach(function(e){e.thisPlatform===n.thisPlatform&&(l=!0)}),l||(n.thisPlatformExists=!0,n.thisBinaryExists=!0,n.thisBinaryLink=a.browser_download_url,n.thisBinarySize=Math.floor(a.size/1024/1024),n.thisChecksumLink=a.browser_download_url.replace(n.thisBinaryExtension,".sha256.txt"))}!0===n.thisPlatformExists&&r.push(n)}}),r=orderPlatforms(r),RELEASEDATA.htmlTemplate=r;var o=Handlebars.compile(document.getElementById("template-selector").innerHTML),l=Handlebars.compile(document.getElementById("template-info").innerHTML);document.getElementById("latest-selector").innerHTML=o(RELEASEDATA),document.getElementById("latest-info").innerHTML=l(RELEASEDATA),setTickLink(),displayLatestPlatform(),window.onhashchange=displayLatestPlatform,loading.innerHTML="";var s=document.getElementById("latest-container");s.className=s.className.replace(/(?:^|\s)invisible(?!\S)/g," animated fadeIn ")}function selectLatestPlatform(e){window.location.hash=e.toLowerCase()}function displayLatestPlatform(){var e=window.location.hash.substr(1).toUpperCase(),t=document.getElementById("latest-info-"+e);t&&(unselectLatestPlatform("keep the hash"),document.getElementById("latest-selector").classList.add("hide"),t.classList.remove("hide"))}function unselectLatestPlatform(e){e||history.pushState("",document.title,window.location.pathname+window.location.search);var t=document.getElementById("latest-selector").getElementsByClassName("latest-asset"),a=document.getElementById("latest-info").getElementsByClassName("latest-info-container");for(i=0;i<t.length;i++)a[i].classList.add("hide");document.getElementById("latest-selector").classList.remove("hide")}var platforms=[],variants=[],lookup={},i=0,variant=getQueryByName("variant"),variantSelector=document.getElementById("variant-selector"),platformSelector=document.getElementById("platform-selector"),logoPath="./dist/assets/",loading=document.getElementById("loading"),errorContainer=document.getElementById("error-container"),menuOpen=document.getElementById("menu-button"),menuClose=document.getElementById("menu-close"),menu=document.getElementById("menu-container");menuOpen.onclick=function(){menu.className=menu.className.replace(/(?:^|\s)slideOutLeft(?!\S)/g," slideInLeft"),menu.className=menu.className.replace(/(?:^|\s)hide(?!\S)/g," animated")},menuClose.onclick=function(){menu.className=menu.className.replace(/(?:^|\s)slideInLeft(?!\S)/g," slideOutLeft")};var submenus=document.getElementById("menu-content").getElementsByClassName("submenu");for(i=0;i<submenus.length;i++){var twisty=document.createElement("span"),twistyContent=document.createTextNode(">");twisty.appendChild(twistyContent),twisty.className="twisty";var thisLine=submenus[i].getElementsByTagName("a")[0];thisLine.appendChild(twisty),thisLine.onclick=function(){this.parentNode.classList.toggle("open")}}var ARCHIVEDATA,dlText=document.getElementById("dl-text"),dlLatest=document.getElementById("dl-latest"),dlArchive=document.getElementById("dl-archive"),dlOther=document.getElementById("dl-other"),dlIcon=document.getElementById("dl-icon"),dlIcon2=document.getElementById("dl-icon-2"),dlVersionText=document.getElementById("dl-version-text"),INSTALLDATA,NIGHTLYDATA,tableHead=document.getElementById("table-head"),tableContainer=document.getElementById("nightly-list"),nightlyList=document.getElementById("nightly-table"),searchError=document.getElementById("search-error"),numberpicker=document.getElementById("numberpicker"),datepicker=document.getElementById("datepicker"),RELEASEDATA;Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),a=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var n=arguments[1],i=0;i<a;){var r=t[i];if(e.call(n,r,i,t))return i;i++}return-1}});