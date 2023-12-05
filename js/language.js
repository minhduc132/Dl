// import i18next from 'i18next';
// import Backend from 'i18next-xhr-backend';
//
// i18next.use(Backend).init({
//     lng: 'en-US', // Ngôn ngữ mặc định
//     fallbackLng: 'en-US', // Ngôn ngữ dự phòng nếu không tìm thấy
//     debug: true, // Bật chế độ debug
//     backend: {
//         loadPath: '/locales/{{lng}}/{{ns}}.json', // Đường dẫn đến các tệp ngôn ngữ
//     },
// });
//
// i18next.on('loaded', () => {
//     // Đã tải dữ liệu ngôn ngữ thành công
//     updatePageContent(); // Hàm này cập nhật nội dung trang dựa trên ngôn ngữ đã chọn
// });
//
// fetch('locales/en-US.json')
//     .then(response => response.json())
//     .then(data => {
//         // Sử dụng các giá trị từ tệp JSON ở đây
//         console.log(data.welcome_message);
//         console.log(data.about_us);
//     })
//     .catch(error => console.error('Lỗi khi tải tệp JSON:', error));
//
// function updatePageContent() {
//     const welcomeMessageElement = document.getElementById('welcomeMessage');
//     const aboutUsElement = document.getElementById('aboutUs');
//
//     if (welcomeMessageElement && aboutUsElement) {
//         // Sử dụng i18next để lấy dữ liệu ngôn ngữ đã tải
//         const welcomeMessage = i18next.t('welcome_message');
//         const aboutUs = i18next.t('about_us');
//
//         // Cập nhật nội dung của các phần tử trên trang
//         welcomeMessageElement.textContent = welcomeMessage;
//         aboutUsElement.textContent = aboutUs;
//     }
// }