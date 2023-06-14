Splitting({
	whitespace: true,
})

$(document).ready(function() {
    $('.burger').click(function(event) {
        $('.burger, .mobile__link').toggleClass('active');
    });
});
$('.mobile__link a').click(function(event) {
	$('.mobile__link').removeClass('active');
});

document.addEventListener('DOMContentLoaded', function(){
		let scrollBlock = document.body
			scrollBlock.classList.add('lock')
		setTimeout(function(){
			scrollBlock.classList.remove('lock')

		}, 3000)

	});

window.onload = setTimeout(function(){
	let preloader = document.getElementById('preloader')
	preloader.style.display = 'none'
}, 3000);

const labels = document.querySelectorAll('.accordion-item__label');
const tabs = document.querySelectorAll('.accordion-tab');

function toggleShow() {
	const target = this;
	const item = target.classList.contains('accordion-tab')
		? target
		: target.parentElement;
	const group = item.dataset.actabGroup;
	const id = item.dataset.actabId;

	tabs.forEach(function(tab) {
		if (tab.dataset.actabGroup === group) {
			if (tab.dataset.actabId === id) {
				tab.classList.add('accordion-active');
			} else {
				tab.classList.remove('accordion-active');
			}
		}
	});

	labels.forEach(function(label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.actabGroup === group) {
			if (tabItem.dataset.actabId === id) {
				tabItem.classList.add('accordion-active');
			} else {
				tabItem.classList.remove('accordion-active');
			}
		}
	});
}

labels.forEach(function(label) {
	label.addEventListener('click', toggleShow);
});

tabs.forEach(function(tab) {
	tab.addEventListener('click', toggleShow);
});


  
  const tags = document.querySelectorAll('.tegs')

  for (const tag of tags) {
	tag.addEventListener('click', () => {
		tag.classList.toggle('active')
	})
  }
  document.getElementById('form').addEventListener('submit', function(event) {
	event.preventDefault();
  
	var selectedTags = Array.from(document.querySelectorAll('.tegs.selected')).map(function(tag) {
	  return tag.innerText;
	});
  
	var formData = new FormData(this);
	formData.append('selectedTags', selectedTags.join(", "));
  
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'sendmail.php', true);
	xhr.send(formData);
  
	// Обработка ответа, если необходимо
  });
  
  document.querySelectorAll('.tegs').forEach(function(tag) {
	tag.addEventListener('click', function() {
	  this.classList.toggle('selected');
	});
  });


  

const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	// autoHeight: true,
	autoplay: {
		speed: 2000
	},
	pagination: {
	  el: '.swiper-pagination',
	},

	breakpoints: {
		430: {
			spaceBetween: 30,
		},
	}
	
  });
  let form = document.querySelector('.form'),
  formInputs = document.querySelectorAll('.input'),
  inputEmail = document.querySelector('.email'),
  inputPhone = document.querySelector('.phone')
//   inputCheckbox = document.querySelector('.checkbox');

const check = document.getElementById('checkbox')
const btn = document.querySelector('.btn-form')

check.addEventListener('change', () => {
	if (check.checked) {
	btn.removeAttribute('disabled')
} else {
	btn.setAttribute('disabled', true)
}
})



// Функция для валидации email
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

$(document).ready(function() {
    // Apply the input mask to the phone input field
    $('#phone').inputmask('7(999) 999-99-99');
});

// Функция для валидации телефона
function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9()\- ]*$/;
    return phoneRegex.test(phone);
}



document.getElementById('form').addEventListener('submit', function(event) {
	event.preventDefault(); // Отменить стандартное поведение отправки формы

	// Получение значений полей
	const nameInput = document.querySelector("input[name='name']");
	const emailInput = document.querySelector("input[name='email']");
	const phoneInput = document.querySelector("input[name='phone']");

	// Удаление класса "error" у всех полей ввода перед валидацией
	nameInput.classList.remove('error');
	emailInput.classList.remove('error');
	phoneInput.classList.remove('error');

	// Проверка валидности значений
	let isValid = true;

	if (nameInput.value.trim() === "") {
		isValid = false;
		nameInput.classList.add('error');
	}

	if (emailInput.value.trim() === "" || !validateEmail(emailInput.value)) {
		isValid = false;
		emailInput.classList.add('error');
	}

	if (phoneInput.value.trim() === "" || !validatePhone(phoneInput.value)) {
		isValid = false;
		phoneInput.classList.add('error');
	}

	if (isValid) {
		// Скрыть содержимое классов form__body и form__footer
		document.querySelector('.form__body').style.display = 'none';
		document.querySelector('.form__footer').style.display = 'none';

		// Показать блок успешного сообщения
		document.querySelector('.massage__success').style.display = 'block';
	}
});

