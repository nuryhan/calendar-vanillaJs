let nav = 0;  //current month
let clicked = null; //whichever day is clicked on

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// console.log("events", events);

const calendar = document.getElementById('calendar');
const newEventModal =document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const modalBackDrop =document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const monthNames = ['January','February','March','April','May','June','July','August', 'September','October','November','December'];

function openModal(date) {
    clicked = date;
    console.log("clicked", clicked);
    const eventForDay = events.find(e=> e.date === clicked);

    console.log("e.date", eventForDay);

    if(eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display ='block';
    } else {
        newEventModal.style.display = "block";
    }

    modalBackDrop.style.display = "block";
}

function load() {
    const dt = new Date();

    if( nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    console.log(month);
    // console.log(year);

    const firstDayofMonth = new Date(year, month, 1);
    const firstWeekDayofMonth = firstDayofMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let FirstWeekday = weekdays[firstWeekDayofMonth];
    // console.log(firstDayofMonth);
    // console.log(FirstWeekday);

    const paddingDays = firstWeekDayofMonth;
    
    document.getElementById('monthDisplay').innerText = `${monthNames[month]} ${year}`

    while (calendar.hasChildNodes()) {
    calendar.removeChild(calendar.firstChild);
    }


    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
    
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    
        if (i > paddingDays) {
          daySquare.innerText = i - paddingDays;
          const eventForDay = events.find(e => e.date === dayString);
    
          if (i - paddingDays === day && nav === 0) {
            daySquare.id = 'currentDay';
          }
    
          if (eventForDay) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = eventForDay.title;
            daySquare.appendChild(eventDiv);
          }
    
          daySquare.addEventListener('click', () => openModal(dayString));
        } else {
          daySquare.classList.add('padding');
        }
    
        calendar.appendChild(daySquare);    
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    modalBackDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e=> e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events)); 
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', ()=> {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', ()=> {
        nav--;
        load();
    })

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();


// Dark Mode JS


let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}
