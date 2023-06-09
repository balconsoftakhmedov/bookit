export default {
	template: `
      <div :class="['monthly-calendar', {'full-width': hideFilter}]">
      <div v-if="!settings.hide_header_titles" class="header">
        <div>{{ translations.booking_appointment }}</div>
      </div>
      <div _ngcontent-serverapp-c112="" class="accordion-group__title active" @click="stmCalendarOpen($event)">
        <div _ngcontent-serverapp-c112="" class="accordion-group__title-wrapp">
          <img _ngcontent-serverapp-c112="" class="accordion-group__icon" src="/wp-content/plugins/bookit/assets/images/icons-calendar.svg" alt="תאריך"> תאריך <!----></div>
        <img _ngcontent-serverapp-c112="" src="/wp-content/plugins/bookit/assets/images/icon-back-dark.svg" alt="" class="accordion-group__state-icon open" :class="{'selected-row': showcalendar }">
      </div>
      <div class="calendar-container noselect" :class="{'hide-row': !showcalendar }">
        <div class="calendar-header">
          <div class="left-arrow" @click="slideMonths(false)">
            <svg _ngcontent-serverApp-c114="" xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" class="calendar-header__icon-next">
              <g _ngcontent-serverApp-c114="" fill="none" fill-rule="evenodd">
                <g _ngcontent-serverApp-c114="" fill="#00013C">
                  <g _ngcontent-serverApp-c114="">
                    <g _ngcontent-serverApp-c114="">
                      <path _ngcontent-serverApp-c114=""
                            d="M.098 6.915C.033 6.855 0 6.775 0 6.675c0-.1.033-.191.098-.271L6.978.12C7.042.04 7.13 0 7.238 0c.11 0 .197.04.262.12l6.88 6.284c.065.08.098.17.098.27s-.033.18-.099.24l-.655.602c-.065.08-.153.12-.262.12-.109 0-.207-.04-.295-.12L7.24 2.074 1.31 7.516c-.087.08-.185.12-.295.12-.109 0-.196-.04-.262-.12l-.655-.601z"
                            transform="translate(-344 -138) translate(10 133) translate(334 4) matrix(0 -1 -1 0 7.876 15.24)"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="months">
            <div
                :class="['month', { active: month.month() == calendar.curMonth && month.year() == calendar.curYear }]"
                v-for="month in curMonths"
                @click="selectMonth(month)"
            >
              <div class="title text-uppercase">{{ month.year() }} {{ month.format(month_format) }}</div>
            </div>
          </div>
          <div class="right-arrow" @click="slideMonths(true)">
            <svg _ngcontent-serverApp-c114="" xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" class="calendar-header__icon-prev">
              <g _ngcontent-serverApp-c114="" fill="none" fill-rule="evenodd">
                <g _ngcontent-serverApp-c114="" fill="#00013C">
                  <g _ngcontent-serverApp-c114="">
                    <g _ngcontent-serverApp-c114="">
                      <path _ngcontent-serverApp-c114=""
                            d="M.098 6.915C.033 6.855 0 6.775 0 6.675c0-.1.033-.191.098-.271L6.978.12C7.042.04 7.13 0 7.238 0c.11 0 .197.04.262.12l6.88 6.284c.065.08.098.17.098.27s-.033.18-.099.24l-.655.602c-.065.08-.153.12-.262.12-.109 0-.207-.04-.295-.12L7.24 2.074 1.31 7.516c-.087.08-.185.12-.295.12-.109 0-.196-.04-.262-.12l-.655-.601z"
                            transform="translate(-344 -138) translate(10 133) translate(334 4) matrix(0 -1 -1 0 7.876 15.24)"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="calendar-body">
          <div v-if="calendar.loading" class="loader">
            <div class="loading">
              <div v-for="n in 9"></div>
            </div>
          </div>
          <div class="weeks">
            <span v-for="(dayName, dayIndex) in weekdays()" :key="dayIndex">{{ dayName }}</span>
          </div>
          <div class="dates">
            <div class="week" v-for="(week, weekIndex) in calendarDays()">
              <div
                  :class="['date', {
                    today: isEqualDate(today, day.date),
                    'selected-day': isEqualDate(day.date, calendar.curAppointmentsDate)
                  }]"
                  v-for="day in week"
                  :key="day.date.dayOfYear()"
              >
                <template v-if="day.dayOff || ! day.currentMonth">
                  <span :class="[{'day-off': day.dayOff, 'inactive': ! day.currentMonth}]">{{ day.date.date() }} </span>

                </template>
                <template v-else>
                  <span v-if="day.date.isBefore(today)" class="day-off">{{ day.date.date() }} </span>

                  <span v-else class="available" @click="handleChangeDay(day, weekIndex)">{{ day.date.date() }} </span>

                  <div v-if="isEqualDate(day.date, calendar.curAppointmentsDate)" class="selected-day-flag"></div>
                </template>
              </div>
              <div v-if="dayLoading === weekIndex" class="loader day loading-animation">
                <div class="loading">
                  <div v-for="n in 9"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div _ngcontent-serverapp-c112="" class="accordion-group__title active" @click="stmTimeOpen($event)">
        <div _ngcontent-serverapp-c112="" class="accordion-group__title-wrapp">
          <img _ngcontent-serverapp-c112="" src="/wp-content/plugins/bookit/assets/images/icons-time-line.svg" alt="תאריך" class="accordion-group__icon">
          בחרו שעה
        </div>
        <img _ngcontent-serverapp-c112="" src="/wp-content/plugins/bookit/assets/images/icon-back-dark.svg" alt="" class="accordion-group__state-icon open" :class="{'selected-row':!dayLoading && calendarAppointmentsDate && showtime }"
             :style="{'transform: rotate(180deg);': !dayLoading && calendarAppointmentsDate }">
      </div>
      <div class="stm-time" :class="{'hide-row': !showtime }">
        <div v-if="!dayLoading && calendarAppointmentsDate" class="booking-form">
          <template v-if="selectedService">
            <div class="form-group stm-row">

              <label v-for="slot in staffTimeSlots" :key="slot.value" :class="{ 'radio-label': true, 'selected': selectedTime.value === slot.value }">
                <input type="radio" name="timeSlot" :value="slot.value" @change="handleChangeTimeSlot($event)">
                {{ slot.label }}
              </label>
            </div>
          </template>
          <template v-else>
            <div class="notice">{{ translations.please_choose_service }}</div>
          </template>
        </div>
      </div>
      <div _ngcontent-serverapp-c112="" class="accordion-group__title active" @click="stmPeopleOpen($event)">
        <div _ngcontent-serverapp-c112="" class="accordion-group__title-wrapp">
          <img _ngcontent-serverapp-c112="" src="/wp-content/plugins/bookit/assets/images/icons-product-people.svg" alt="תאריך" class="accordion-group__icon">
          כמה תהיו?
        </div>
        <img _ngcontent-serverapp-c112="" src="/wp-content/plugins/bookit/assets/images/icon-back-dark.svg" alt="" class="accordion-group__state-icon open" :class="{'selected-row':!dayLoading && calendarAppointmentsDate && showpeople }"
             :style="{'transform: rotate(180deg);': !dayLoading && calendarAppointmentsDate }">
      </div>
      <div class="stm-people" :class="{'hide-row': !showpeople }">
        <div v-if="!dayLoading && calendarAppointmentsDate" class="booking-form">
          <template v-if="selectedService">
            <div class="form-group stm-row">
              <label v-for="(staff, index) in availableStaff" :key="staff.id" :class="{ 'radio-label': true, 'selected': selectedStaff && selectedStaff.id === staff.id }">
                <div class="stm-label">
                  <input type="radio" name="staff" :value="staff.id" @change="handleChangeStaff($event)" :checked="selectedStaff && selectedStaff.id === staff.id">
                  {{ staff.full_name }}
                  <div class="stm-label-row" v-if="CurrentStaffServicePrice(selectedService,'price') > 0">
                    <div class="stm-subtotal">{{ generatePrice(parseFloat(StaffAdultTotal), settings) }}</div>
                    <div class="stm-div-input">
                      <button class="stm-plus" @click="PlusChangeStaffAdult(selectedService)">+</button>
                      <div class="stm-number">{{ selectedStaffAdult }}</div>
                      <button class="stm-minus" @click="MinusChangeStaffAdult(selectedService)">-</button>
                    </div>
                    <div class="stm-title">
                      <input type="hidden" name="staff_adult_number" class="stm-input" :value="selectedStaffAdult" @keyup="handleChangeStaffAdult($event, selectedService)">מבוגר  {{ getStaffPrice(staff, selectedService, settings) }}
                    </div>
                  </div>
                  <div class="stm-label-row" v-if="CurrentStaffServicePrice(selectedService,'child_price') > 0">
                    <div class="stm-subtotal">{{ generatePrice(parseFloat(StaffChildTotal), settings) }}</div>
                    <div class="stm-div-input">
                      <button class="stm-plus" @click="PlusChangeStaffChild(selectedService)">+</button>
                      <div class="stm-number">{{ selectedStaffChild }}</div>
                      <button class="stm-minus" @click="MinusChangeStaffChild(selectedService)">-</button>
                    </div>
                    <div class="stm-title">
                      <input type="hidden" name="staff_child_number" class="stm-input" :value="selectedStaffChild" @keyup="handleChangeStaffChild($event, selectedService)"> ילד (עד גיל 18) -
                      {{ getStaffChildPrice(staff, selectedService, settings) }}
                    </div>
                  </div>
                  <div class="stm-label-row" v-if="CurrentStaffServicePrice(selectedService,'basket_price') > 0">
                    <div class="stm-subtotal">{{ generatePrice(parseFloat(StaffBasketTotal), settings) }}</div>
                    <div class="stm-div-input">
                      <button class="stm-plus" @click="PlusChangeStaffBasket(selectedService)">+</button>
                      <div class="stm-number">{{ selectedStaffBasket }}</div>
                      <button class="stm-minus" @click="MinusChangeStaffBasket(selectedService)">-</button>
                    </div>
                    <div class="stm-title">
                      סל פיקניק זוגי
                      {{ getStaffBasketPrice(staff, selectedService, settings) }}
                    </div>
                  </div>
                  <div class="stm-label-row" v-if="CurrentStaffServicePrice(selectedService,'basket_cheese_price') > 0">
                    <div class="stm-subtotal">{{ generatePrice(parseFloat(StaffBasketCheeseTotal), settings) }}</div>
                    <div class="stm-div-input">
                      <button class="stm-plus" @click="PlusChangeStaffBasketCheese(selectedService)">+</button>
                      <div class="stm-number">{{ selectedStaffBasketCheese }}</div>
                      <button class="stm-minus" @click="MinusChangeStaffBasketCheese(selectedService)">-</button>
                    </div>
                    <div class="stm-title"> סל פיקניק זוגי (גבינה טבעונית) {{ getStaffBasketCheesePrice(staff, selectedService, settings) }}
                    </div>
                  </div>
                  <div class="stm-label-row">
                    <div class="stm-total">{{ generatePrice(parseFloat(StaffTotal), settings) }}</div>
                    <div class="stm-div-total-label">
                      סה״כ
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div class="form-group">
              <button class="stm-button" @click="showBookingForm" :disabled="!selectedStaff || !selectedTime || !StaffTotal">{{ translations.submit }}</button>
            </div>
          </template>
          <template v-else>
            <div class="notice">{{ translations.please_choose_service }}</div>
          </template>
        </div>
      </div>
      </div>
	`,
	data: () => ({
		curMonths: [],
		dayLoading: null,
		translations: bookit_window.translations,
		month_format: (window.innerWidth > 600) ? 'MMMM' : 'MMM',
		showtime: false,
		showpeople: false,
		showcalendar: true,
	}),
	computed: {
		settings() {
			return this.$store.getters.getSettings;
		},
		calendar() {
			return this.$store.getters.getCalendar;
		},
		today() {
			return this.moment().startOf('day');
		},
		serviceAppointments() {
			return this.$store.getters.getServiceAppointments;
		},
		selectedService() {
			return this.$store.getters.getSelectedService;
		},
		hideFilter() {
			return this.$store.getters.getHideFilter;
		},
		availableStaff() {
			let staff = [...this.$store.getters.getStaff];
			if (this.selectedService) {
				staff = staff.filter(staff => {
					return staff.staff_services.some(staff_service => staff_service.id == this.selectedService.id)
				});
				if (!staff.find(staff => staff === this.selectedStaff)) {
					this.selectedStaff = staff[0];
				}
			}
			return staff;
		},
		time_slot_list() {
			return this.$store.getters.getTimeSlotList;
		},
		staffTimeSlots() {
			const workingHours = this.selectedStaff.working_hours.find(
				wh => wh.weekday === this.calendarAppointmentsDate.isoWeekday()
			);

			const selectedStaffDisabledTimeSlots = this.disabledTimeSlots.filter(
				dts => parseInt(dts.staff_id) === parseInt(this.selectedStaff.id)
			);

			let timeSlots = this.getFreeTimeSlotsForStaff(
				workingHours,
				this.time_slot_list,
				selectedStaffDisabledTimeSlots,
				this.selectedService.duration,
				this.calendarAppointmentsDate
			);

			if (timeSlots.length > 0) {
				this.selectedTime = timeSlots[0];
			} else {
				this.selectedTime = null;
				timeSlots.push({value: null, label: bookit_window.translations.not_available});
			}

			return timeSlots;
		},
		selectedStaff: {
			get() {
				return this.$store.getters.getSelectedStaff;
			},
			set(staff) {
				this.$store.commit('setSelectedStaff', staff);
			}
		},
		selectedStaffAdult: {
			get() {
				return this.$store.getters.getSelectedStaffAdult;
			},
			set(staff) {
				this.$store.commit('setSelectedStaffAdult', staff);
			}
		},
		selectedStaffChild: {
			get() {
				return this.$store.getters.getSelectedStaffChild;
			},
			set(staff) {
				this.$store.commit('setSelectedStaffChild', staff);
			}
		},
		selectedStaffBasket: {
			get() {
				return this.$store.getters.getSelectedStaffBasket;
			},
			set(staff) {
				this.$store.commit('setSelectedStaffBasket', staff);
			}
		},
		selectedStaffBasketCheese: {
			get() {
				return this.$store.getters.getSelectedStaffBasketCheese;
			},
			set(staff) {
				this.$store.commit('setSelectedStaffBasketCheese', staff);
			}
		},
		StaffAdultTotal: {
			get() {
				return this.$store.getters.getStaffAdultTotal;
			},
			set(price) {
				this.$store.commit('setStaffAdultTotal', price);
			}
		},
		StaffChildTotal: {
			get() {
				return this.$store.getters.getStaffChildTotal;
			},
			set(price) {
				this.$store.commit('setStaffChildTotal', price);
			}
		},
		StaffBasketTotal: {
			get() {
				return this.$store.getters.getStaffBasketTotal;
			},
			set(price) {
				this.$store.commit('setStaffBasketTotal', price);
			}
		},
		StaffBasketCheeseTotal: {
			get() {
				return this.$store.getters.getStaffBasketCheeseTotal;
			},
			set(price) {
				this.$store.commit('setStaffBasketCheeseTotal', price);
			}
		},
		StaffTotal: {
			get() {
				return this.$store.getters.getStaffTotal;
			},
			set(price) {
				this.$store.commit('setStaffTotal', price);
			}
		},
		selectedTime: {
			get() {
				return this.$store.getters.getSelectedTime;
			},
			set(time) {
				this.$store.commit('setSelectedTime', time);
			}
		},
		disabledTimeSlots: {
			get() {
				return this.$store.getters.getDisabledTimeSlots;
			},
			set(timeSlots) {
				this.$store.commit('setDisabledTimeSlots', timeSlots);
			}
		},
		calendarAppointmentsDate: {
			get() {
				return this.$store.getters.getCalendarAppointmentsDate;
			},
			set(value) {
				this.$store.commit('setCalendarAppointmentsDate', value);
			}
		},
		calendarWeek: {
			get() {
				return this.$store.getters.getCalendarWeek;
			},
			set(weekIndex) {
				this.$store.commit('setCalendarWeek', weekIndex);
			}
		},
	},
	created() {
		this.curMonths = this.months(this.calendar.curMonth, this.calendar.curYear);
	},
	methods: {
		weekdays() {
			let weekdays = this.moment.weekdaysShort();
			weekdays.push(weekdays.shift());
			return weekdays;
		},
		months(month, year) {
			let currentMonth = this.moment().month(month).year(year).startOf('month');
			let months = [];

			for (let i = 0; i < 1; i++) {
				months.push(currentMonth.clone().set('month', currentMonth.month() + i));
			}

			return months;
		},
		selectMonth(newMonth) {
			if (newMonth.month() !== this.calendar.curMonth) {
				this.calendarWeek = null;
				this.calendarAppointmentsDate = null;
				this.$store.dispatch('setCalendarMonthYear', newMonth);
			}
		},
		slideMonths(next) {
			let curMonth = this.curMonths[0];
			let moveTo = (next) ? curMonth.month() + 5 : curMonth.month() - 5;
			this.calendarWeek = null;

			curMonth.set('month', moveTo);

			this.selectMonth(curMonth);
			this.curMonths = this.months(curMonth.month(), curMonth.year());
		},
		calendarDays() {
			let firstDay = this.moment().month(this.calendar.curMonth).year(this.calendar.curYear).startOf('month');
			let dayOfWeek = (0 < firstDay.weekday()) ? firstDay.weekday() : 7;
			let workingDays = this.getStaffWorkingDays();
			let startDate = firstDay.clone();
			console.log('fff');
			startDate.set('date', firstDay.date() - dayOfWeek);

			let item, daysArray = [], weekArray = [], tempItem;
			for (let i = 1; i < 43; i++) {
				item = startDate.clone();
				item.set('date', startDate.date() + i);

				tempItem = {
					date: item,
					currentMonth: (this.calendar.curMonth === item.month()),
					dayOff: !workingDays.includes(item.isoWeekday()),
					staff: 0,
					slots: 0
				};

				if (this.selectedService && !tempItem.dayOff) {
					tempItem.staff = this.availableStaff.length;
					this.availableStaff.forEach(staff => {
						tempItem.slots += this.getStaffTimeSlots(staff, tempItem.date).length;
					});
					tempItem.dayOff = (this.isEqualDate(tempItem.date, this.today) && tempItem.slots === 0);
				}

				if (this.serviceAppointments.length > 0 && !tempItem.dayOff && this.selectedService) {
					let dayAppointments = this.serviceAppointments.find(obj => obj.date_timestamp == tempItem.date.unix());
					if (dayAppointments !== undefined) {
						tempItem.dayOff = (dayAppointments.appointments >= tempItem.slots);
						tempItem.slots -= dayAppointments.appointments;
					}
				}

				if (this.selectedService && tempItem.slots <= 0) {
					tempItem.dayOff = true;
				}

				if (tempItem.dayOff && this.calendarAppointmentsDate && this.isEqualDate(tempItem.date, this.calendarAppointmentsDate)) {
					this.calendarAppointmentsDate = null;
					this.calendarWeek = null;
				}

				weekArray.push(tempItem);

				if (i % 7 === 0 && weekArray.filter(obj => obj.currentMonth === true).length > 0) {
					daysArray.push(weekArray);
					weekArray = [];
				}
			}

			return daysArray;
		},
		getStaffWorkingDays() {
			let workingDays = [];
			this.availableStaff.forEach(staff => {
				workingDays = workingDays.concat(
					staff.working_hours.map(item => {
						if (item.start_time !== null) return item.weekday;
					})
				);
			});
			return [...new Set(workingDays)];
		},
		getStaffTimeSlots(staff, date) {
			const workingHours = staff.working_hours.find(
				wh => wh.weekday === date.isoWeekday()
			);
			return this.getTimeSlots(
				workingHours.start_time,
				workingHours.end_time,
				workingHours.break_from,
				workingHours.break_to,
				this.selectedService.duration,
				this.isEqualDate(date, this.today)
			);
		},
		handleChangeStaff(event) {
			this.selectedStaff = this.availableStaff.find(staff => staff.id === event.target.value);
		},
		handleChangeStaffAdult(event, service) {
			this.selectedStaffAdult = (event.target.value) ? event.target.value : 0;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffAdultTotal = parseFloat(this.selectedStaffAdult) * parseFloat(current_service.price);
			this.StaffTotal += this.StaffAdultTotal;
		},
		PlusChangeStaffAdult(service) {
			this.selectedStaffAdult = this.selectedStaffAdult + 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffAdultTotal = parseFloat(this.selectedStaffAdult) * parseFloat(current_service.price);
			this.StaffTotal += this.StaffAdultTotal;
		},
		MinusChangeStaffAdult(service) {
			this.selectedStaffAdult = (this.selectedStaffAdult == 0) ? 0 : this.selectedStaffAdult - 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffAdultTotal = parseFloat(this.selectedStaffAdult) * parseFloat(current_service.price);
			this.StaffTotal += this.StaffAdultTotal;
		},
		stmPeopleOpen(event) {
			this.showpeople = (this.showpeople == false) ? true : false;
		},
		stmTimeOpen(event) {
			this.showtime = (this.showtime == false) ? true : false;
		},
		stmCalendarOpen(event) {
			this.showcalendar = (this.showcalendar == false) ? true : false;
		},
		handleChangeStaffChild(event, service) {
			this.selectedStaffChild = (event.target.value) ? event.target.value : 0;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffChildTotal = parseFloat(this.selectedStaffChild) * parseFloat(current_service.child_price);
			this.StaffTotal = this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		PlusChangeStaffChild(service) {
			this.selectedStaffChild = this.selectedStaffChild + 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffChildTotal = parseFloat(this.selectedStaffChild) * parseFloat(current_service.child_price);
			this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		MinusChangeStaffChild(service) {
			this.selectedStaffChild = (this.selectedStaffChild == 0) ? 0 : this.selectedStaffChild - 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffChildTotal = parseFloat(this.selectedStaffChild) * parseFloat(current_service.child_price);
			this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		CurrentStaffServicePrice(service,key_price) {
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			return current_service[key_price];
		},
		PlusChangeStaffBasket(service) {
			this.selectedStaffBasket = this.selectedStaffBasket + 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffBasketTotal = parseFloat(this.selectedStaffBasket) * parseFloat(current_service.basket_price);
			this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		MinusChangeStaffBasket(service) {
			this.selectedStaffBasket = (this.selectedStaffBasket == 0) ? 0 : this.selectedStaffBasket - 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffBasketTotal = parseFloat(this.selectedStaffBasket) * parseFloat(current_service.basket_price);
			this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		PlusChangeStaffBasketCheese(service) {
			this.selectedStaffBasketCheese = this.selectedStaffBasketCheese + 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffBasketCheeseTotal = parseFloat(this.selectedStaffBasketCheese) * parseFloat(current_service.basket_cheese_price);
			this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		MinusChangeStaffBasketCheese(service) {
			this.selectedStaffBasketCheese = (this.selectedStaffBasketCheese == 0) ? 0 : this.selectedStaffBasketCheese - 1;
			let current_service = this.selectedStaff.staff_services.find(staff_service => staff_service.id == service.id);
			this.StaffBasketCheeseTotal = parseFloat(this.selectedStaffBasketCheese) * parseFloat(current_service.basket_cheese_price);
			this.StaffTotal = this.StaffBasketTotal + this.StaffBasketCheeseTotal + this.StaffChildTotal + this.StaffAdultTotal;
		},
		handleChangeTimeSlot(event) {
			this.selectedTime = this.staffTimeSlots.find(time => time.value === event.target.value);
			this.showpeople = true;
		},
		async handleChangeDay(day, weekIndex) {

			if (this.isEqualDate(day.date, this.calendarAppointmentsDate)) {
				this.calendarAppointmentsDate = null;
				this.calendarWeek = null;
			} else {

				this.calendarAppointmentsDate = day.date;
				this.calendarWeek = weekIndex;
				this.dayLoading = null;
				if (this.selectedService) {
					this.setDisabledTimeSlots(weekIndex);
				}
				this.showtime = true;
				this.showpeople = true;
			}
		},
		showBookingForm() {
			this.$store.commit('setShowBookingForm', true);
		},

		async setDisabledTimeSlots(weekIndex = null) {
			if (this.calendarAppointmentsDate === undefined || this.calendarAppointmentsDate === null) {
				return;
			}
			const data = {
				nonce: bookit_window.nonces.bookit_day_appointments,
				date_timestamp: this.calendarAppointmentsDate.unix()
			};
			if (this.selectedStaff) {
				data['staff_id'] = this.selectedStaff.id;
			}

			this.dayLoading = weekIndex;
			await this.axios.post(`${bookit_window.ajax_url}?action=bookit_day_appointments`, this.generateFormData(data), this.getPostHeaders()).then((res) => {
				let response = res.data;
				if (response.success) {
					this.disabledTimeSlots = response.data;
				}
				this.dayLoading = null;
			});
		}
	},
	watch: {
		selectedStaff() {
			this.setDisabledTimeSlots();
		},
	}
}