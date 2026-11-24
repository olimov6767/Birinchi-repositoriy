(function(){
  var views=['bosh','qollanma'];
  function route(){
    var h=(location.hash||'#bosh').slice(1);
    if(views.indexOf(h)<0)h='bosh';
    views.forEach(function(v){
      document.getElementById('v-'+v).classList.toggle('on',v===h);
      var t=document.getElementById('t-'+v);
      if(v===h)t.setAttribute('aria-current','page');else t.removeAttribute('aria-current');
    });
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',route);route();

  var pairs=[
    ['Menga kofe haqida yoz.','Sen kofe bo‘yicha blogersan. Kofe ixlosmandi bo‘lmagan yangi boshlovchilar uchun 150 so‘zli, do‘stona ohangdagi kirish matni yoz. Oxirida 3 ta amaliy maslahat ro‘yxati bo‘lsin.'],
    ['Kod yozib ber.','Sen Python dasturchisisan. CSV faylni o‘qib, har bir ustun bo‘yicha o‘rtacha qiymatni chiqaradigan funksiya yoz. Izohlar o‘zbek tilida, kod PEP8 ga mos bo‘lsin.'],
    ['Resume yaxshila.','Sen HR mutaxassisisan. Quyidagi rezyumeni marketing menejer lavozimiga moslashtir. Har bir tajriba punktini natija raqamlari bilan qayta yoz va 5 ta ustuvor o‘zgarishni ro‘yxat qilib ber.']
  ];
  var i=0;
  function show(){document.getElementById('bad').textContent=pairs[i][0];document.getElementById('good').textContent=pairs[i][1]}
  document.getElementById('swap').addEventListener('click',function(){i=(i+1)%pairs.length;show()});show();

  var ids=['rol','vazifa','kontekst','format'];
  var labels={rol:'Sen',vazifa:'Vazifa',kontekst:'Kontekst',format:'Javob formati'};
  var current='';
  function build(){
    var parts=[],n=0;
    ids.forEach(function(k){
      var v=document.getElementById('f-'+k).value.trim();
      if(v){n++;parts.push(k==='rol'?'Sen '+v+'.':labels[k]+': '+v+'.')}
    });
    current=parts.join('\n');
    document.getElementById('out').textContent=current||'Maydonlarni to‘ldiring...';
    document.querySelectorAll('#meter i').forEach(function(el,idx){el.classList.toggle('f',idx<n)});
  }
  ids.forEach(function(k){document.getElementById('f-'+k).addEventListener('input',build)});
  document.getElementById('copy').addEventListener('click',function(){
    var t=document.getElementById('toast');
    if(!current){t.textContent='Avval maydonlarni to‘ldiring.';return}
    function ok(){t.textContent='Nusxa olindi!'}
    function fallback(){
      var ta=document.createElement('textarea');ta.value=current;document.body.appendChild(ta);ta.select();
      try{document.execCommand('copy');ok()}catch(e){t.textContent='Matnni qo‘lda belgilab nusxa oling.'}
      document.body.removeChild(ta);
    }
    try{navigator.clipboard.writeText(current).then(ok,fallback)}catch(e){fallback()}
  });
})();