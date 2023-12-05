
// select2
$(document).ready(function() {
    $('select').select2();
});


let roomCount = 1; // Ban đầu, đã có 1 phòng.
function renderTraverler() {
    const traveller = document.getElementById("render");
    const traveller_stop =document.getElementById("render_stop")
    let html = '';
    rooms.forEach((room, index) => {

        if (index !== 0) {
            // Nếu không phải phòng đầu tiên, hiển thị nút "Xóa"
            html += `<button id="close_room2"  onclick="roomFunction(${index})">&times;</button>`;
        }
        html += `<div class="roommm"><div class="text_Room">
                    <label>Room ${index + 1}</label>
                </div>
                <div class="add_traveller">
                    <p>Adults (18+)</p>
                    <div class="from_traveller">
                        <div class="input-group-prepend">
                            <button class="input_number" onclick="decreaseCount('adult', ${index})"><i class="fa-solid fa-minus"></i></button>
                        </div>
                        <input class="from_traveller" id="adult_input_${index}" name="adult_quantity" value="${room.adult}" min="1" max="9" type="number" readonly>
                        <div class="input-group-append">
                            <button class="input_numbers"  onclick="increaseCount('adult', ${index})"><i class="fa-solid fa-plus "></i></button>
                        </div>
                    </div>
                </div>
                <div class="add_traveller">
                    <p>Children (2-17)</p>
                    <div class="from_traveller">
                        <div class="input-group-prepend">
                            <button class="input_number" onclick="decreaseCount('children', ${index})"><i class="fa-solid fa-minus"></i></button>
                        </div>
                        <input class="from_traveller" id="children_input_${index}" name="children_quantity" value="${room.children}" min="0" max="6" type="number" readonly>
                        <div class="input-group-append">
                            <button class="input_numbers" onclick="increaseCount('children', ${index})"><i class="fa-solid fa-plus "></i></button>
                        </div>
                    </div>
                </div>
                 <div class="add_traveller">
                    <p>Infants (< 24 mths)</p>
                    <div class="from_traveller">
                        <div class="input-group-prepend">
                            <button class="input_number" onclick="decreaseCount('infant', ${index})"><i class="fa-solid fa-minus"></i></button>
                        </div>
                        <input class="from_traveller" id="infant_input_${index}" name="infant_quantity" value="${room.infant}" min="0" max="9" type="number" readonly>
                        <div class="input-group-append">
                            <button class="input_numbers"  onclick="increaseCount('infant', ${index})"><i class="fa-solid fa-plus "></i></button>
                        </div>
                    </div>
                </div>
                </div>
            </div>`

    })
    traveller.innerHTML = html;
    traveller_stop.innerHTML=html;
    updatePaxInfo();
}

// Lấy thẻ "room_info" bằng ID
const roomInfo = document.getElementById("room_info");

if (roomCount === 1) {
    roomInfo.innerHTML = "1 Room";
} else {
    roomInfo.innerHTML = roomCount + " Rooms";
}

// Lấy thẻ "guests_info" bằng ID và cập nhật thông tin số người
const guestsInfo = document.getElementById("guests_info");
guestsInfo.innerHTML = roomCount  + " Pax(s)";

// Lấy thẻ "add_room" bằng ID
const addRoomButton = document.getElementById("add_room");
const maxRoomsMessage = document.getElementById("text");

if (roomCount >= 3) {
    // Nếu đã đủ 3 phòng, ẩn nút "Add Room" và hiển thị thông báo
    addRoomButton.style.display = 'none';
    maxRoomsMessage.style.display = 'block';
    //  } else {
    // Nếu chưa đủ 3 phòng, hiển thị nút "Add Room" và ẩn thông báo
    addRoomButton.style.display = 'block';
    maxRoomsMessage.style.display = 'none';


}

function increaseCount(type, index) {
    const room = rooms[index];
    const totalPax = getTotalPax();

    if (type === 'adult' && room.adult < 9 && totalPax < 9) {
        room.adult++;
    } else if (type === 'children' && room.children < 6 && totalPax < 9) {
        room.children++;
    } else if (type === 'infant' && room.infant < room.adult) {
        room.infant++;
    }

    if (getTotalPax() > 9) {
        document.getElementById("maxPassengersMessage").style.display = "block";
    } else {
        document.getElementById("maxPassengersMessage").style.display = "none";
    }

    updatePaxInfo();
    renderTraverler();
    checkMaxPassengers();
}

function decreaseCount(type, index) {
    const room = rooms[index];

    if (type === 'adult' && room.adult > 1) {
        room.adult--;
        if (room.infant > room.adult) {
            room.infant = room.adult;
        }
    } else if (type === 'children' && room.children > 0) {
        room.children--;
    } else if (type === 'infant' && room.infant > 0) {
        room.infant--;
    }

    updatePaxInfo();
    renderTraverler();
    checkMaxPassengers();
}


function getTotalPax() {
    let totalPax = 0;
    rooms.forEach((room, index) => {
        totalPax += room.adult + room.children;
    });
    return totalPax;
}

function updatePaxInfo() {
    let totalPax = 0;
    rooms.forEach((room, index) => {
        totalPax += room.adult + room.children + room.infant;
        const adultInput = document.querySelector(`#adult_input_${index}`);
        const childrenInput = document.querySelector(`#children_input_${index}`);
        const infantInput = document.querySelector(`#infant_input_${index}`);
        if (adultInput && childrenInput && infantInput) {
            adultInput.value = room.adult;
            childrenInput.value = room.children;
            infantInput.value = room.infant;
        }
    });
    document.getElementById("guests_info").innerHTML = totalPax + " Pax(s)";
}


const defaultRoom = {
    adult: 0,
    children: 0,
    infant: 0
};
var rooms = [Object.assign({}, defaultRoom)];


const room = rooms[0]; // Lấy ra phòng đầu tiên
room.adult = 2;
renderTraverler()



document.getElementById("add_room").onclick = function() {
    if (roomCount < 3 && getTotalPax() < 9) {
        rooms.push(Object.assign({}, defaultRoom));
        roomCount++;
        // Mặc định 1 người lớn khi thêm phòng mới
        rooms[roomCount - 1].adult = 1;
        renderTraverler();
        updateRoomInfo();
    }
    // Kiểm tra và cập nhật thông báo
    const maxRoomsMessage = document.getElementById("text");
    const addRoomButton = document.getElementById("add_room");

    if (roomCount >= 3) {
        maxRoomsMessage.style.display = 'block';
        addRoomButton.style.display = 'none'; // Ẩn nút khi đủ 3 phòng
    } else {
        maxRoomsMessage.style.display = 'none';
        addRoomButton.style.display = 'block'; // Hiển thị nút khi dưới 3 phòng
    }
}


function updateRoomInfo() {
    const roomInfo = document.getElementById("room_info");
    roomInfo.innerHTML = roomCount === 1 ? "1 Phòng" : roomCount + " Phòng";
}

// loại bỏ xóa room đầu
function roomFunction(indexValue) {
    if (indexValue !== 0) {
        rooms = rooms.filter((x, y) => y !== indexValue);
        roomCount--;
        renderTraverler();
        updateRoomInfo();

        // Kiểm tra và cập nhật thông báo sau khi xóa phòng
        const maxRoomsMessage = document.getElementById("text");
        const addRoomButton = document.getElementById("add_room");

        if (roomCount < 3) {
            maxRoomsMessage.style.display = 'none';
            addRoomButton.style.display = 'block'; // Hiển thị nút khi dưới 3 phòng sau khi xóa
        }
    }
}

function checkMaxPassengers() {
    const totalPax = getTotalPax();

    if (totalPax >= 9) {
        document.getElementById("maxPassengersMessage").style.display = "block";
    } else {
        document.getElementById("maxPassengersMessage").style.display = "none";
    }
}


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function  travellerstopoverFunction(){
    document.getElementById("traveller_stopover").classList.toggle("show");
}
function  travellerhotelFunction(){
    document.getElementById("traveller_hotel").classList.toggle("show");
}
function travellerpackageFunction(){
    document.getElementById("traveller_Package").classList.toggle("show");
}
function  travellertransfersFunction(){
    document.getElementById("traveller_transfers").classList.toggle("show");
}


document.addEventListener("click", function(event) {
    const traveller = document.getElementById("traveller");
    const iptShow = document.querySelector(".ipt-show");

    if (!traveller.contains(event.target) && !iptShow.contains(event.target)) {
        traveller.classList.remove("show");
    }
});

function travellerFunction() {
    const traveller = document.getElementById("traveller");
    traveller.classList.toggle("show");
}

// sự kiện click trên nút + và -
document.querySelectorAll(".input_number").forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});

// sự kiện click trên traveler
document.getElementById("traveller").addEventListener("click", function(event) {
    event.stopPropagation();
});


window.onclick = function(event) {
//dropdown
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown_content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
// check radio
function economy(){
    let cabin = 'Economy';
    document.getElementById('cabin').value = cabin;
}
function business(){
    let cabin = 'Business';
    document.getElementById('cabin').value = cabin;
}
function first(){
    let cabin = 'First';
    document.getElementById('cabin').value = cabin;
}
function stopoverFunction(){
    document.getElementById("myDropdown_stopover").classList.toggle("show");
}
function economystopoverFunction(){
    let economy_stopover='Economy'
    document.getElementById('cabin_stopover').value=economy_stopover;
}
function businessstopoverFunction(){
    let business_stopover='Business'
    document.getElementById('cabin_stopover').value=business_stopover;
}
function firststopoverFunction() {
    let first_stopover = 'First'
    document.getElementById('cabin_stopover').value = first_stopover;
}

//check box
function checkboxFunction() {
    let checkBox = document.getElementById("myCheck");
    let text = document.getElementById("checkbox");
    if (checkBox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function onewayFunction(){
    let checkRadio =document.getElementById("checks");
    let radio = document.getElementById("onewayreturning");
    if (checkRadio.checked == true){
        radio.style.display = "none";
    } else {
        radio.style.display = "block";
    }
}
function roundFunction(){
    let checkRadio =document.getElementById("check");
    let radio=document.getElementById("onewayreturning")
    if (checkRadio.checked == true){
        radio.style.display = "block";
    } else {
        radio.style.display = "none";
    }
}
function oneFunction(){
    let checkRadio= document.getElementById("check_transferss")
    let radio=document.getElementById("returnupdate")
    if (checkRadio.checked == true){
        radio.style.display = "block";
    } else {
        radio.style.display = "none";
    }
}
function twoFunction(){
    let checkRadio= document.getElementById("check_transfers")
    let radio=document.getElementById("returnupdate")
    if (checkRadio.checked == true){
        radio.style.display = "none";
    } else {
        radio.style.display = "block";
    }
}
function threeFunction(){
    let checkRadio= document.getElementById("check_transfer")
    let radio=document.getElementById("returnupdate")
    if (checkRadio.checked == true){
        radio.style.display = "none";
    } else {
        radio.style.display = "block";
    }
}

// date timez none
$( function() {
    var dateFormat = "mm/dd/yy",
        departing =
            $( "input[name='departing']" )
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 2,
                    minDate:+2
                })
                .on( "change", function() {
                    returning.datepicker( "option", "minDate", getDate( this ) )
                }),
        returning =
            $( "input[name='returning']" )
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 2,
                    minDate:+4
                })
                .on( "change", function() {
                    departing.datepicker( "option", "maxDate", getDate( this ) );
                });
    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    }
} );

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


// Xác định phần tử chọn ngôn ngữ
const languageSelect = document.getElementById('myModal');

// Lắng nghe sự kiện khi người dùng chọn ngôn ngữ
languageSelect.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        // Lấy giá trị ngôn ngữ từ id của phần tử a
        const selectedLanguage = event.target.id;

        // Thực hiện việc thay đổi ngôn ngữ dựa trên giá trị đã chọn (selectedLanguage)
        // Ví dụ: Cập nhật nội dung ứng dụng với ngôn ngữ đã chọn
        fetch(`locales/${selectedLanguage}.json`)
            .then(response => response.json())
            .then(data => {
                // Thay đổi nội dung trong ứng dụng dựa trên dữ liệu từ tệp JSON
                const welcomeMessage = data.welcome_message;
                const aboutUs = data.about_us;

                // Ví dụ: Thay đổi tiêu đề và nội dung trang web
                document.getElementById('welcomeMessage').textContent = welcomeMessage;
                document.getElementById('aboutUs').textContent = aboutUs;
            })
            .catch(error => console.error('Lỗi khi tải tệp JSON:', error));
    }
});
