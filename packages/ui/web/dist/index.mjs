var i=document.createElement("template");i.innerHTML=`
  <style>
    :host {
      position: fixed;
      display: none;
      z-index: 1000;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }
    .wrapper {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 240px;
      position: relative;
    }
    :host([data-position="center"]) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    :host([data-position="bottomsheet"]) {
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: 16px 16px 0 0;
    }
    .social-button {
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    .social-button.kakao { background: #fee500; color: #000; }
    .social-button.facebook { background: #1877f2; color: #fff; }
    .social-button.pinterest { background: #e60023; color: #fff; }
  </style>
  <div class="overlay"></div>
  <div class="wrapper"></div>
`;var n=class extends HTMLElement{static get observedAttributes(){return["platforms","url","kakao-key","class","position"]}constructor(){super(),this.attachShadow({mode:"open"}).appendChild(i.content.cloneNode(!0))}connectedCallback(){this.renderButtons(),this.applyAttributes(),this.attachEvents()}attributeChangedCallback(e,t,o){this.applyAttributes(),e==="platforms"&&this.renderButtons()}applyAttributes(){let e=this.shadowRoot?.querySelector(".wrapper"),t=this.getAttribute("position")||"center";this.setAttribute("data-position",t);let o=this.getAttribute("class");o&&(e.className=`wrapper ${o}`)}renderButtons(){let e=this.shadowRoot?.querySelector(".wrapper"),t=(this.getAttribute("platforms")||"").split(",").map(a=>a.trim()),o=this.getAttribute("url")||window.location.href;e.innerHTML="",t.forEach(a=>{let s=document.createElement("button");s.className=`social-button ${a}`,s.dataset.platform=a,s.textContent=a.charAt(0).toUpperCase()+a.slice(1),s.onclick=()=>this.share(a,o),e.appendChild(s)})}share(e,t){switch(e){case"facebook":window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(t)}`,"_blank");break;case"pinterest":window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(t)}`,"_blank");break;case"kakao":this.shareToKakao(t);break}this.close()}shareToKakao(e){let t=this.getAttribute("kakao-key");if(!window.Kakao&&t){let o=document.createElement("script");o.src="https://developers.kakao.com/sdk/js/kakao.min.js",o.onload=()=>{window.Kakao.init(t),window.Kakao.Share.sendDefault({objectType:"feed",content:{title:"\uACF5\uC720\uD558\uAE30",description:"\uBC94\uC804\uC5D0\uC11C \uACF5\uC720\uB41C \uCF58\uD150\uCE20\uC785\uB2C8\uB2E4.",imageUrl:"",link:{mobileWebUrl:e,webUrl:e}}})},document.head.appendChild(o)}else window.Kakao&&t&&window.Kakao.Share.sendDefault({objectType:"feed",content:{title:"\uACF5\uC720\uD558\uAE30",description:"\uBC94\uC804\uC5D0\uC11C \uACF5\uC720\uB41C \uCF58\uD150\uCE20\uC785\uB2C8\uB2E4.",imageUrl:"",link:{mobileWebUrl:e,webUrl:e}}})}open(){this.style.display="block"}close(){this.style.display="none"}attachEvents(){this.shadowRoot?.querySelector(".overlay")?.addEventListener("click",()=>this.close()),window.addEventListener("keydown",t=>{t.key==="Escape"&&this.close()})}};customElements.define("bj-share-layer",n);customElements.get("bj-share-layer")||customElements.define("bj-share-layer",n);
