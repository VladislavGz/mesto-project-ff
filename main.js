(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.addEventListener("click",n),document.addEventListener("keydown",o)}function t(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",n),document.removeEventListener("keydown",o),function(e){e.querySelector(".popup__button_loading-element").classList.remove("popup__button_loading-element_active")}(e)}function n(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&t(e.currentTarget)}function o(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.querySelector(".popup__button_loading-element").classList.add("popup__button_loading-element_active")}function c(e,t,n,o,r,c){var a=e.cloneNode(!0),i=a.querySelector(".card__title"),u=a.querySelector(".card__image"),s=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),p=a.querySelector(".card__like-counter");return i.textContent=t.name,p.textContent=t.likes,u.setAttribute("src",t.link),u.setAttribute("alt","Фото: ".concat(t.name)),t.isLike&&l.classList.add("card__like-button_is-active"),t.isOwner?s.addEventListener("click",(function(){c.delCard(t.cardId).then((function(){n(a)})).catch((function(e){console.log(e)}))})):(s.disabled=!0,s.classList.add("card__delete-button_disabled")),l.addEventListener("click",(function(){l.classList.contains("card__like-button_is-active")?c.delLike(t.cardId).then((function(e){p.textContent=e.likes.length,o(l)})).catch((function(e){console.log(e)})):c.putLike(t.cardId).then((function(e){p.textContent=e.likes.length,o(l)})).catch((function(e){console.log(e)}))})),u.addEventListener("click",(function(){r({src:t.link,alt:"Фото: ".concat(t.name),txt:t.name})})),a}function a(e){e.remove()}function i(e){e.classList.toggle("card__like-button_is-active")}function u(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.textContent="",o.classList.remove(n.errorClass)}function s(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),s(o,t)}var p={baseUrl:"https://nomoreparties.co/v1/",cohortId:"wff-cohort-8",headers:{authorization:"e90a88de-4d84-48ee-a98b-66385728ff23","Content-Type":"application/json"}};function d(e){return fetch("".concat(p.baseUrl).concat(p.cohortId,"/cards/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function _(e){return fetch("".concat(p.baseUrl).concat(p.cohortId,"/cards/likes/").concat(e),{method:"PUT",headers:p.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function f(e){return fetch("".concat(p.baseUrl).concat(p.cohortId,"/cards/likes/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}var m=document.querySelector("#card-template").content.querySelector(".card"),v=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),y=document.querySelector(".places__list"),k=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),q=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_edit-avatar"),E=k.querySelector(".popup__form"),j=E.elements.name,A=E.elements.description,I=S.querySelector(".popup__form"),x=I.elements["place-name"],P=I.elements.link,B=g.querySelector(".popup__form"),U=B.elements.link;function w(e){b.setAttribute("style",'background-image: url("'.concat(e,'")'))}function T(t){var n=L.querySelector(".popup__image"),o=L.querySelector(".popup__caption");n.setAttribute("src",t.src),n.setAttribute("alt",t.alt),o.textContent=t.txt,e(L)}function O(e,t){v.textContent=e,h.textContent=t}function D(){I.reset(),l(S.querySelector(".popup__form"),{inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"}),e(S)}k.classList.add("popup_is-animated"),S.classList.add("popup_is-animated"),L.classList.add("popup_is-animated"),g.classList.add("popup_is-animated"),q.addEventListener("click",(function(){j.value=v.textContent,A.value=h.textContent,l(k.querySelector(".popup__form"),{inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"}),e(k)})),E.addEventListener("submit",(function(e){var n;e.preventDefault(),r(k),(n={name:j.value,about:A.value},fetch("".concat(p.baseUrl).concat(p.cohortId,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){O(e.name,e.about),t(k)})).catch((function(e){console.log(e)}))})),C.addEventListener("click",D),I.addEventListener("submit",(function(e){var n;e.preventDefault(),r(S),(n={name:x.value,link:P.value},fetch("".concat(p.baseUrl).concat(p.cohortId,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var n={name:e.name,link:e.link,likes:e.likes.length,cardId:e._id,isOwner:!0,isLike:!1},o={delCard:d,putLike:_,delLike:f};y.prepend(c(m,n,a,i,T,o)),t(S)})).catch((function(e){console.log(e)}))})),b.addEventListener("click",(function(){B.reset(),l(g.querySelector(".popup__form"),{inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"}),e(g)})),B.addEventListener("submit",(function(e){var n;e.preventDefault(),r(g),(n={avatar:U.value},fetch("".concat(p.baseUrl).concat(p.cohortId,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){w(e.avatar),t(g)})).catch((function(e){console.log(e)}))})),document.addEventListener("keydown",(function(e){"+"!==e.key||D()}));var N,J=fetch("".concat(p.baseUrl).concat(p.cohortId,"/users/me"),{headers:p.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),H=fetch("".concat(p.baseUrl).concat(p.cohortId,"/cards"),{headers:p.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}));Promise.all([J,H]).then((function(e){w(e[0].avatar),O(e[0].name,e[0].about);var t=e[0]._id;e[1].forEach((function(e){for(var n=e.owner._id,o=!1,r=0;r<e.likes.length;r++)if(e.likes[r]._id===t){o=!0;break}var u={name:e.name,link:e.link,likes:e.likes.length,cardId:e._id,isOwner:t===n,isLike:o},s={delCard:d,putLike:_,delLike:f};y.append(c(m,u,a,i,T,s))}))})).catch((function(e){console.log(e)})),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(N.formSelector)).forEach((function(e){var t=Array.from(e.querySelectorAll(N.inputSelector)),n=e.querySelector(N.submitButtonSelector);t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){if(t.validity.valid)u(e,t,n);else{var o=t.validationMessage;t.validity.patternMismatch&&(o=t.getAttribute("data-pattern-err-msg")),function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,o,n)}}(e,o,N),function(e,t,n){!function(e){return e.every((function(e){return e.validity.valid}))}(n)?s(e,t):function(e,t){e.disabled=!1,e.classList.remove(t.inactiveButtonClass)}(e,t)}(n,N,t)}))}))}))})();