const offcanvasBody = document.querySelector('.offcanvas-body');
const name = document.querySelector('.offcanvas-title');
const userName = offcanvasBody.getElementsByTagName('p')[0];
const Age = offcanvasBody.getElementsByTagName('p')[1];
const main = document.getElementsByTagName('main')[0];
const dropdowns = document.querySelectorAll('.dropdown-item');
const search = document.querySelector('.search');
const searchbtn= document.querySelector('.searchbtn');
const footer = document.getElementsByTagName('footer')[0];
const hr = document.getElementsByTagName('hr')[0];
 
let sub = 'Top ';
 
let apiarr=[
  'pub_43852bf24ffca0ba8d2af1fc14abff306aa71',
  'pub_418750f317b788b466d0b520693b6a9429bc4',
  'pub_43822a112cf6e6ac3924eb640e808fe155508',
  'pub_4410606a6be384c147aef388c8dc83c72edef',
  'pub_444277ccbc735f57e8bed24fdebdd9d91051d'
];
let api=apiarr.pop();
window.onload=()=>{
   window.scrollTo({ top: 0 ,behavior: 'smooth'});
   let user = localStorage.getItem('user');
   user=JSON.parse(user)
  name.innerHTML=`${user.fullname}`;
  userName.innerHTML=`username : ${user.userName}`;
  Age.innerHTML=`age : ${user.age}`
  get_section1();
 }

var firstvisit=false;
var page=null;
let changeresults;
// Function to fetch news data from the API
const getNews = async (sub, arr = null) => {

  try {
    let response=null;
    let count = Math.floor(Math.random() * 100);
    if(page===null){
      if(firstvisit===true){
    const url = `https://newsdata.io/api/1/news?apikey=${api}&q=${sub}$page=${count}&image=1&language=en`;
    response = await fetch(url);
      }
      else{
        const url = `https://newsdata.io/api/1/news?apikey=${api}&category=${sub}&image=1&language=en`;
        response = await fetch(url);
        firstvisit=true;
      }
    }
    else{
      const url = `https://newsdata.io/api/1/news?apikey=${api}&page=${page}&image=1&language=en`;
      response = await fetch(url);
    }

    const data = await response.json();
    page=data.nextPage;
   let results = data.results;
     results = results.filter(obj => obj.description !== null && obj.title !== null&&obj.image_url!==null);

    results = results.filter((article, index, self) =>
      index === self.findIndex((a) => (
        a.image_url === article.image_url || a.title === article.title
      ))
    );

    if (arr !== null) {
      results = results.filter(obj => !arr.some(a => a.image_url === obj.image_url || a.title === obj.title));
    }
    return results;
  } catch (error) {
   if(apiarr.length>0){
       firstvisit=false;
       page=null;
       api=apiarr.pop();
     changeresults = await getNews(sub,arr);
      return  changeresults;
    }
  else{
    const section1 = document.createElement('section');
    section1.id = 'first_box';
   section1.innerHTML = `
          <h1>Server Problem</h1>
          <p>We're having trouble fetching the news right now. Please try again later.</p>
      `;
        section1.style.display = 'flex';
      section1.style.flexDirection='column';
        section1.style.justifyContent = 'center';
        section1.style.alignItems = 'center';
    main.appendChild(main);
    return null;
  }
  }
}
async function get_section1(sub='top') {
  footer.style.display='none';
  hr.style.display='none'
  let firstsection = document.createElement('div');
  firstsection.classList.add('container')
  firstsection.classList.add('text-center')
  firstsection.classList.add('my-auto');
  let spinner = document.createElement('div');
  spinner.style.height="70px"
  spinner.style.width='70px'
  spinner.classList.add('spinner');
  spinner.classList.add('spinner-border')
  firstsection.appendChild(spinner)
  main.innerHTML='';
  main.appendChild(firstsection)
  let originalData = await getNews(sub);
  while (originalData.length <=6) {
    originalData = originalData.concat(await getNews('top', originalData));
  }
  if (originalData.length > 6) {
    originalData = originalData.slice(0, 6);
  }
  createsection1(originalData);
}

function createsection1(arr) {
  var data = arr;
  function getmaxobj(data) {
    const maxLength = Math.max(...data.map(item => item.description.length));
    const maxDescriptionData = data.filter(item => item.description.length === maxLength && maxLength > 0);
    let max = maxDescriptionData[0];
    return max;
  }
  const firstobj = getmaxobj(data);
  data = data.filter(item => item !== firstobj);
  const  secondobj = getmaxobj(data);
  data = data.filter(item => item !== secondobj);
   
  let firstsection = document.createElement('div');
   let secondsection = document.createElement('div');
  firstsection.classList.add('container');
  firstsection.classList.add('topnews');
  firstsection.classList.add('col-sm-8')
    secondsection.classList.add('container');
    secondsection.classList.add('relatednews');
    secondsection.classList.add('col-sm-4')
  firstsection.innerHTML=`
  <h4 class="text-dark text-center">${sub} news</h4>
    <div class="card mx-auto mt-3 shadow-lg" style="width: 100%;">
      <img class="card-img-top" src="https://www.w3schools.com/bootstrap5/la.jpg" style="width:100%;" class="mt-2">
      <div class="card-body">
         <h4 class="card-title"></h4>
        <p class=" p-2 mt-1 badge bg-secondary rounded-pill">Publish date : <span class="date">${firstobj.pubDate.substring(0, 10).split('-').reverse().join('-')}</span></p>
      
        <p class="card-text text-secondary"></p>
      </div>
      </div>


  <div class="card mx-auto mt-4 shadow-lg" style="width: 100%;">
    <img class="card-img-top" src=" " class="mt-2">
    <div class="card-body">
      <h4 class="card-title"> </h4>
       <p class="p-2 mt-1 badge bg-secondary rounded-pill">Publish date : <span class="date">${secondobj.pubDate.substring(0, 10).split('-').reverse().join('-')}</span></p>
      
      
      <p class="card-text text-secondary"></p>
    </div>
    </div>
  `;

  secondsection.innerHTML=`
    <h4 class="text-center mb-3">Related News</h4>
    <div class="card mx-auto shadow-lg" style="width:100%">
      <img class="card-img-top" src="https://www.w3schools.com/bootstrap5/la.jpg" alt="Card image" style="width:100%;">
      <div class="card-body">
        <p class="card-title">Some example text some example text. John Doe is an architect and engineer</p>
        <a href="#" class="btn btn-outline-dark" data-bs-toggle="collapse" data-bs-target="#rcard1">Read more</a>
        <div class="collapse" data-bs-parent=".relatednews"  id="rcard1"> 
        <p class="mt-2  badge bg-secondary rounded-pill">Publish date : <span class="date"></span></p>
         <p><small class="card-text"></small></p>
        </div>
      </div>
    </div>
    <div class="card mx-auto mt-2 shadow-lg" style="width:100%">
      <img class="card-img-top" src="https://www.w3schools.com/bootstrap5/la.jpg" alt="Card image" style="width:100%;">
      <div class="card-body">
        <p class="card-title">Some example text some example text. John Doe is an architect and engineer</p>
         <a href="#" class="btn btn-outline-dark" data-bs-toggle="collapse" data-bs-target="#rcard2">Read more</a>
        <div class="collapse" data-bs-parent=".relatednews"  id="rcard2"> 
         <p class="mt-2 badge bg-secondary rounded-pill">Publish date : <span class="date"></span></p>
         <p><small class="card-text"></small></p>
        </div>
      </div>
    </div>
    <div class="card mx-auto mt-2 shadow-lg" style="width:100%">
      <img class="card-img-top" src="https://www.w3schools.com/bootstrap5/la.jpg" alt="Card image" style="width:100%;">
      <div class="card-body">
        <p class="card-title">Some example text some example text. John Doe is an architect and engineer</p>
       <a href="#" class="btn btn-outline-dark" data-bs-toggle="collapse" data-bs-target="#rcard3">Read more</a>
        <div class="collapse" data-bs-parent=".relatednews"  id="rcard3"> 
         <p class="mt-2 badge bg-secondary rounded-pill">Publish date : <span class="date"></span></p>
         <p><small class="card-text"></small></p>
        </div>
      </div>
    </div>
    `;

  main.innerHTML='';
   window.scrollTo({ top: 0 ,behavior: 'smooth'});
  footer.style.display='flex'
   hr.style.display='block'
  main.appendChild(firstsection);
  main.appendChild(secondsection);
  const topnews= document.querySelector('.topnews');
  const topnewsCards = Array.from(topnews.querySelectorAll('.card'));
  const relatedNews =document.querySelector('.relatednews')
  const relatedNewsCards = Array.from(relatedNews.querySelectorAll('.card'))
    topnewsCards[0].querySelector('.card-img-top').src=firstobj.image_url;
   topnewsCards[1].querySelector('.card-img-top').src=secondobj.image_url;
   topnewsCards[0].querySelector('.card-title').innerHTML=firstobj.title;
  topnewsCards[0].querySelector('.card-text').innerHTML=firstobj.description;
  topnewsCards[1].querySelector('.card-title').innerHTML=secondobj.title;
  topnewsCards[1].querySelector('.card-text').innerHTML=secondobj.description;

  for(let i=0;i<relatedNewsCards.length;i++){
    relatedNewsCards[i].querySelector('.card-img-top').src=data[i].image_url;
    relatedNewsCards[i].querySelector('.card-title').innerHTML=data[i].title;
     relatedNewsCards[i].querySelector('.card-text').innerHTML=data[i].description;
    relatedNewsCards[i].querySelector('.date').innerHTML=`${data[i].pubDate.substring(0, 10).split('-').reverse().join('-')}`
  }
}
 dropdowns.forEach((e)=>{
   e.addEventListener('click',()=>{
     get_section1(e.innerText)
     sub=e.innerText;
   })
 })
searchbtn.addEventListener('click',()=>{
  if(search.value!==''){
    get_section1(search.value);
    sub=search.value;
    search.value='';
  }
})