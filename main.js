const $=id=>document.getElementById(id);
const pkr=n=>"PKR "+n.toLocaleString("en-PK");
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const WA="923280357579",MAIL="hmadil10511@gmail.com",FREE=5000,SHIP=250;
const CITIES=["Lahore","Karachi","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala","Hyderabad","Other"];
let cart=load("vayro_cart",[]),wish=load("vayro_wish",[]),sel={},f={};
const P=id=>PRODUCTS.find(p=>p.id===+id);
const sub=()=>cart.reduce((s,c)=>s+P(c.id).price*c.qty,0);
const bg=(p,i)=>p.image&&p.image[i]?"background-image:url('"+p.image[i]+"')":"background-color:"+p.color+(i?";filter:brightness("+(1+i*.18)+")":"");
function card(p){const w=wish.includes(p.id);
 return '<article class="card"><a class="thumb-link" href="#product-'+p.id+'"><div class="thumb" style="'+bg(p,0)+'" role="img" aria-label="'+p.name+' (sample image)">'+(p.image[0]?"":"V")+'</div></a>'+
 (p.tag?'<span class="badge">'+p.tag+'</span>':"")+'<button class="wish" data-wish="'+p.id+'" aria-pressed="'+w+'">'+(w?"Saved":"Save")+'</button>'+
 '<h3><a href="#product-'+p.id+'">'+p.name+'</a></h3><p class="cat">'+p.category+' · In stock</p><p class="price">'+pkr(p.price)+(p.old?'<s>'+pkr(p.old)+'</s>':"")+'</p>'+
 '<button class="btn" data-add="'+p.id+'">Add to cart</button></article>'}
const grid=l=>l.length?'<div class="grid">'+l.map(card).join("")+'</div>':'<p class="note">No products match. Try clearing a filter.</p>';
const opts=(a,v)=>a.map(x=>'<option'+(x===v?' selected':'')+'>'+x+'</option>').join("");
function home(){return '<section class="hero"><h1 class="wordmark">VAYRO</h1><div class="hero-row"><p class="hero-line">Wear Your Identity.</p><p class="hero-sub">Clean cuts, honest fabrics, made for everyday life in Pakistan.</p><div class="hero-btns"><a class="btn" href="#men">Shop Men</a><a class="btn btn-light" href="#women">Shop Women</a></div></div></section>'+
 '<section class="section"><div class="section-head"><h2>New Arrivals</h2><a href="#new">View all</a></div>'+grid(PRODUCTS.filter(p=>p.tag==="New"))+'</section>'+
 '<section class="split"><a href="#men" class="tile tile-men"><span>Men\'s Collection</span></a><a href="#women" class="tile tile-women"><span>Women\'s Collection</span></a></section>'+
 '<section class="section"><div class="section-head"><h2>Best Sellers</h2><a href="#best">View all</a></div>'+grid(PRODUCTS.filter(p=>p.best).slice(0,4))+'</section>'+
 '<section class="promo"><h2>Winter edit. Up to 30% off.</h2><a class="btn btn-light" href="#shop">Shop the sale</a></section>'+
 '<section class="section about"><h2>Made to be worn, not just photographed.</h2><p>VAYRO started with a simple idea: good basics should not cost a fortune. Pieces you can wear on repeat, delivered to your door.</p></section>'+
 '<section class="section"><div class="section-head"><h2>What customers say</h2><span class="note">Sample reviews for demo only</span></div><div class="quotes"><blockquote>Fits well and the fabric feels solid.<cite>Sample customer, Lahore</cite></blockquote><blockquote>Easy ordering on WhatsApp.<cite>Sample customer, Karachi</cite></blockquote><blockquote>Clean design, exactly what I wanted.<cite>Sample customer, Islamabad</cite></blockquote></div></section>'+
 '<section class="news"><h2>Get new drops first.</h2><form id="newsForm" class="toolbar"><label class="sr" for="ne">Email</label><input id="ne" type="email" placeholder="Your email" required><button class="btn" type="submit">Subscribe</button></form><p id="newsMsg" class="note" role="status"></p></section>'}
const TITLES={shop:"Shop All",men:"Men's Collection",women:"Women's Collection",new:"New Arrivals",best:"Best Sellers"};
function filtered(v){let l=PRODUCTS.filter(p=>(v==="men"?p.category==="Men":v==="women"?p.category==="Women":v==="new"?p.tag==="New":v==="best"?p.best:true)&&
 (!f.q||p.name.toLowerCase().includes(f.q.toLowerCase()))&&(!f.cat||p.category===f.cat)&&(!f.size||p.sizes.includes(f.size))&&
 (!f.price||(p.price>=+f.price.split("-")[0]&&p.price<+f.price.split("-")[1])));
 if(f.sort==="low")l.sort((a,b)=>a.price-b.price);if(f.sort==="high")l.sort((a,b)=>b.price-a.price);return l}
function shop(v){f={};return '<section class="section"><div class="section-head"><h2>'+TITLES[v]+'</h2></div><div class="toolbar" id="tb" data-v="'+v+'"><input id="fq" type="search" placeholder="Search products" aria-label="Search"><select id="fcat" aria-label="Category"><option value="">All categories</option><option>Men</option><option>Women</option></select><select id="fprice" aria-label="Price"><option value="">Any price</option><option value="0-3000">Under 3,000</option><option value="3000-5000">3,000 to 5,000</option><option value="5000-99999">Over 5,000</option></select><select id="fsize" aria-label="Size"><option value="">Any size</option>'+["S","M","L","XL"].map(s=>'<option>'+s+'</option>').join("")+'</select><select id="fsort" aria-label="Sort"><option value="">Sort: Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div><div id="list">'+grid(filtered(v))+'</div></section>'}
function product(id){const p=P(id);if(!p)return '<section class="section"><h2>Product not found</h2><a href="#shop">Back to shop</a></section>';
 sel={id:p.id,size:p.sizes[0],color:p.colors[0],qty:1};
 return '<section class="section"><div class="pdp"><div class="gallery"><div class="thumb" style="'+bg(p,0)+'"></div><div class="thumb" style="'+bg(p,1)+'"></div><div class="thumb" style="'+bg(p,2)+'"></div></div><div><p class="cat">'+p.category+' · In stock · Sample product</p><h1>'+p.name+'</h1><p class="big">'+pkr(p.price)+(p.old?' <s class="note">'+pkr(p.old)+'</s>':"")+'</p><p>'+p.desc+'</p>'+
 '<strong>Size</strong><div class="opt" data-k="size">'+p.sizes.map((s,i)=>'<button data-opt="'+s+'" aria-pressed="'+(i===0)+'">'+s+'</button>').join("")+'</div>'+
 '<strong>Color</strong><div class="opt" data-k="color">'+p.colors.map((s,i)=>'<button data-opt="'+s+'" aria-pressed="'+(i===0)+'">'+s+'</button>').join("")+'</div>'+
 '<strong>Quantity</strong><div class="qty opt"><button data-q="-1" aria-label="Decrease">-</button><span id="q">1</span><button data-q="1" aria-label="Increase">+</button></div>'+
 '<button class="btn" data-addp="1">Add to cart</button> <button class="btn btn-light" data-wish="'+p.id+'">'+(wish.includes(p.id)?"Saved":"Save")+'</button></div></div></section>'}
function wishlist(){const l=wish.map(P).filter(Boolean);return '<section class="section"><div class="section-head"><h2>Wishlist</h2></div>'+(l.length?grid(l):'<p class="note">Nothing saved yet. Tap Save on any product.</p>')+'</section>'}
const key=c=>c.id+"|"+c.size+"|"+c.color;
function checkout(){if(!cart.length)return '<section class="section"><h2>Checkout</h2><p class="note">Your cart is empty.</p><a class="btn" href="#shop">Shop now</a></section>';
 const s=sub(),d=s>=FREE?0:SHIP;
 return '<section class="section"><div class="section-head"><h2>Checkout</h2></div><div class="cols"><form class="form" id="co" novalidate><label for="n">Full name</label><input id="n" required autocomplete="name"><label for="ph">Phone (03XXXXXXXXX)</label><input id="ph" inputmode="numeric" placeholder="03001234567" required autocomplete="tel"><label for="em">Email</label><input id="em" type="email" required autocomplete="email"><label for="ad">Delivery address</label><textarea id="ad" rows="3" required></textarea><label for="ct">City</label><select id="ct">'+opts(CITIES)+'</select><label for="pc">Postal code</label><input id="pc" inputmode="numeric"><strong>Payment: Cash on Delivery</strong><p class="note">No online payment. You pay the rider when your parcel arrives.</p><p class="err" id="err" role="alert"></p><button class="btn" type="submit">Send order on WhatsApp</button></form>'+
 '<div class="sum"><h3>Order summary</h3>'+cart.map(c=>'<p>'+c.qty+' × '+P(c.id).name+' ('+c.size+', '+c.color+')</p>').join("")+'<p class="total">Subtotal <span>'+pkr(s)+'</span></p><p class="total">Delivery <span>'+(d?pkr(d):"Free")+'</span></p><p class="total">Total <span>'+pkr(s+d)+'</span></p></div></div></section>'}
function done(){return '<section class="section page"><h2>Order message ready</h2><div class="msg">WhatsApp should now be open with your order. <strong>Press Send there.</strong> Your order is confirmed only after VAYRO replies to you.</div><a class="btn" href="#home">Back to home</a></section>'}
const about=()=>'<section class="section page"><h2>About VAYRO</h2><p>VAYRO is a Pakistani fashion label for people who like clean, simple clothes. We keep designs minimal, fabrics honest and prices fair.</p><p>Every order is delivered with Cash on Delivery. Questions? Message us anytime.</p><a class="btn" href="#contact">Contact us</a></section>';
const contact=()=>'<section class="section page"><h2>Contact us</h2><p>Phone / WhatsApp: <a href="tel:03280357579">0328 0357579</a><br>Email: <a href="mailto:'+MAIL+'">'+MAIL+'</a></p><form class="form" id="cf"><label for="cn">Your name</label><input id="cn" required><label for="cm">Message</label><textarea id="cm" rows="4" required></textarea><button class="btn" type="submit">Send by email</button></form><p class="note">This opens your email app with the message ready to send.</p></section>';
function route(){const h=(location.hash||"#home").slice(1);let v;
 if(TITLES[h])v=shop(h);else if(h.startsWith("product-"))v=product(h.slice(8));else v=({home,wishlist,checkout,done,about,contact}[h]||home)();
 $("view").innerHTML=v;window.scrollTo(0,0);$("nav").classList.remove("on");bind()}
function bind(){const tb=$("tb");if(tb){const up=()=>{f={q:$("fq").value,cat:$("fcat").value,price:$("fprice").value,size:$("fsize").value,sort:$("fsort").value};$("list").innerHTML=grid(filtered(tb.dataset.v))};tb.oninput=up;tb.onchange=up}
 const nf=$("newsForm");if(nf)nf.onsubmit=e=>{e.preventDefault();$("newsMsg").textContent="Demo only: email not saved yet."};
 const cf=$("cf");if(cf)cf.onsubmit=e=>{e.preventDefault();location.href="mailto:"+MAIL+"?subject="+encodeURIComponent("Message from "+$("cn").value)+"&body="+encodeURIComponent($("cm").value)};
 const co=$("co");if(co)co.onsubmit=e=>{e.preventDefault();const v=i=>$(i).value.trim();
  if(!v("n")||!v("ad")||!/^03\d{9}$/.test(v("ph"))||!/^\S+@\S+\.\S+$/.test(v("em"))){$("err").textContent="Please enter name, address, a valid email and a phone like 03001234567.";return}
  const s=sub(),d=s>=FREE?0:SHIP;
  const t="New VAYRO order\n"+cart.map(c=>c.qty+" x "+P(c.id).name+" ("+c.size+", "+c.color+") = "+pkr(P(c.id).price*c.qty)).join("\n")+"\nSubtotal: "+pkr(s)+"\nDelivery: "+(d?pkr(d):"Free")+"\nTotal: "+pkr(s+d)+" (Cash on Delivery)\n\nName: "+v("n")+"\nPhone: "+v("ph")+"\nEmail: "+v("em")+"\nAddress: "+v("ad")+", "+v("ct")+" "+v("pc");
  window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank");cart=[];renderCart();location.hash="done"}}
function renderCart(){$("cartItems").innerHTML=cart.length?cart.map((c,i)=>{const p=P(c.id);return '<div class="line"><strong>'+p.name+'<br><span class="note">'+c.size+', '+c.color+'</span></strong><span>'+pkr(p.price*c.qty)+'</span><div class="qty"><button data-dec="'+i+'" aria-label="Decrease">-</button><span>'+c.qty+'</span><button data-inc="'+i+'" aria-label="Increase">+</button></div><button class="icon-btn" data-rm="'+i+'">Remove</button></div>'}).join(""):'<p class="empty">Your cart is empty. Add something you like.</p>';
 $("cartTotal").textContent=pkr(sub());$("cartCount").textContent=cart.reduce((s,c)=>s+c.qty,0);$("wishCount").textContent="Wishlist ("+wish.length+")";save("vayro_cart",cart);save("vayro_wish",wish)}
function openCart(o){$("drawer").classList.toggle("on",o);$("overlay").classList.toggle("on",o);$("drawer").setAttribute("aria-hidden",String(!o))}
function addItem(id,size,color,qty){const n={id:+id,size:size,color:color,qty:qty},c=cart.find(x=>key(x)===key(n));if(c)c.qty+=qty;else cart.push(n);renderCart();openCart(true)}
document.addEventListener("click",e=>{const t=e.target.closest("button,a");if(!t)return;const d=t.dataset;
 if(t.id==="checkoutBtn")openCart(false);
 if(d.add){const p=P(d.add);addItem(p.id,p.sizes[0],p.colors[0],1)}
 if(d.addp)addItem(sel.id,sel.size,sel.color,sel.qty);
 if(d.opt){const g=t.parentElement;sel[g.dataset.k]=d.opt;g.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b===t))}
 if(d.q){sel.qty=Math.max(1,sel.qty+ +d.q);$("q").textContent=sel.qty}
 if(d.inc)cart[+d.inc].qty++;
 if(d.dec){cart[+d.dec].qty--;cart=cart.filter(x=>x.qty>0)}
 if(d.rm)cart.splice(+d.rm,1);
 if(d.wish){const id=+d.wish;wish=wish.includes(id)?wish.filter(x=>x!==id):wish.concat(id);renderCart();route();return}
 if(d.inc||d.dec||d.rm)renderCart()});
$("cartBtn").onclick=()=>openCart(true);$("closeCart").onclick=$("overlay").onclick=()=>openCart(false);
$("menuBtn").onclick=()=>{const o=$("nav").classList.toggle("on");$("menuBtn").setAttribute("aria-expanded",o)};
document.addEventListener("keydown",e=>{if(e.key==="Escape")openCart(false)});
window.addEventListener("hashchange",route);renderCart();route();
