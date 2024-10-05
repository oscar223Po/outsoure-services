(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            document.addEventListener("click", setSpollerAction);
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerItems = spollersBlock.querySelectorAll("details");
                if (spollerItems.length) spollerItems.forEach((spollerItem => {
                    let spollerTitle = spollerItem.querySelector("summary");
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerItem.hasAttribute("data-open")) {
                            spollerItem.open = false;
                            spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.classList.add("_spoller-active");
                            spollerItem.open = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        spollerTitle.classList.remove("_spoller-active");
                        spollerItem.open = true;
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                }));
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("summary") && el.closest("[data-spollers]")) {
                    e.preventDefault();
                    if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
                        const spollerTitle = el.closest("summary");
                        const spollerBlock = spollerTitle.closest("details");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
                            !spollerBlock.open ? spollerBlock.open = true : setTimeout((() => {
                                spollerBlock.open = false;
                            }), spollerSpeed);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                            if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
                                const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
                                const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
                                const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                window.scrollTo({
                                    top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                                    behavior: "smooth"
                                });
                            }
                        }
                    }
                }
                if (!el.closest("[data-spollers]")) {
                    const spollersClose = document.querySelectorAll("[data-spoller-close]");
                    if (spollersClose.length) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerCloseBlock = spollerClose.parentNode;
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                            setTimeout((() => {
                                spollerCloseBlock.open = false;
                            }), spollerSpeed);
                        }
                    }));
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveBlock = spollersBlock.querySelector("details[open]");
                if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
                    const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    setTimeout((() => {
                        spollerActiveBlock.open = false;
                    }), spollerSpeed);
                }
            }
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) tabsContent.forEach(((tabsContentItem, index) => {
                tabsTitles[index].setAttribute("data-tabs-title", "");
                tabsContentItem.setAttribute("data-tabs-item", "");
                if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
            }));
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function getDigFormat(item, sepp = " ") {
        return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll("div.select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true,
                speed: 150
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Прокинувся, построїв селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, немає жодного select");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
            this.config.speed = +originalSelect.dataset.speed;
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
                setTimeout((() => {
                    selectItem.style.zIndex = "";
                }), originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
            this.setOptionsPosition(selectItem);
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            setTimeout((() => {
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                    _slideToggle(selectOptions, originalSelect.dataset.speed);
                    if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) selectItem.style.zIndex = selectOpenzIndex; else setTimeout((() => {
                        selectItem.style.zIndex = "";
                    }), originalSelect.dataset.speed);
                }
            }), 0);
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            const selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ""} class="${this.selectClasses.classSelectOptionsScroll}">`;
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += `</div>`;
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        setOptionsPosition(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
            const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
            const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;
            if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
                selectOptions.hidden = false;
                const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue("max-height"));
                const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
                const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
                selectOptions.hidden = true;
                const selectItemHeight = selectItem.offsetHeight;
                const selectItemPos = selectItem.getBoundingClientRect().top;
                const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
                const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
                if (selectItemResult < 0) {
                    const newMaxHeightValue = selectOptionsHeight + selectItemResult;
                    if (newMaxHeightValue < 100) {
                        selectItem.classList.add("select--show-top");
                        selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
                    } else {
                        selectItem.classList.remove("select--show-top");
                        selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
                    }
                }
            } else setTimeout((() => {
                selectItem.classList.remove("select--show-top");
                selectItemScroll.style.maxHeight = customMaxHeightValue;
            }), +originalSelect.dataset.speed);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
            if (!selectOptions.classList.contains("_slide")) {
                if (originalSelect.multiple) {
                    optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                    const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                    originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                        originalSelectSelectedItem.removeAttribute("selected");
                    }));
                    const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                    selectSelectedItems.forEach((selectSelectedItems => {
                        originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                    }));
                } else {
                    if (!originalSelect.hasAttribute("data-show-selected")) setTimeout((() => {
                        if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                        optionItem.hidden = true;
                    }), this.config.speed);
                    originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                    this.selectAction(selectItem);
                }
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setSelectChange(originalSelect);
            }
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message} `) : null;
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target, src) {
        if (target === void 0) target = {};
        if (src === void 0) src = {};
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function utils_classesToTokens(classes) {
        if (classes === void 0) classes = "";
        return classes.trim().split(" ").filter((c => !!c.trim()));
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay) {
        if (delay === void 0) delay = 0;
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis) {
        if (axis === void 0) axis = "x";
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend() {
        const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < arguments.length; i += 1) {
            const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll(_ref) {
        let {swiper, targetPosition, side} = _ref;
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_elementChildren(element, selector) {
        if (selector === void 0) selector = "";
        const children = [ ...element.children ];
        if (element instanceof HTMLSlotElement) children.push(...element.assignedElements());
        if (!selector) return children;
        return children.filter((el => el.matches(selector)));
    }
    function elementIsChildOf(el, parent) {
        const isChild = parent.contains(el);
        if (!isChild && parent instanceof HTMLSlotElement) {
            const children = [ ...parent.assignedElements() ];
            return children.includes(el);
        }
        return isChild;
    }
    function showWarning(text) {
        try {
            console.warn(text);
            return;
        } catch (err) {}
    }
    function utils_createElement(tag, classes) {
        if (classes === void 0) classes = [];
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
        return el;
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function utils_elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    function utils_makeElementsArray(el) {
        return (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice(_temp) {
        let {userAgent} = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides) {
        if (overrides === void 0) overrides = {};
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        const device = getDevice();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
        const isSafariBrowser = isSafari();
        const need3dFix = isSafariBrowser || isWebView && device.ios;
        return {
            isSafari: needPerspectiveFix || isSafariBrowser,
            needPerspectiveFix,
            need3dFix,
            isWebView
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize(_ref) {
        let {swiper, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((_ref2 => {
                        let {contentBoxSize, contentRect, target} = _ref2;
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = function(target, options) {
            if (options === void 0) options = {};
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.hostEl);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.hostEl, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler() {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit() {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
            if (slides[i] && elementStyle(slide, "display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[swiper.getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? utils_elementOuterSize(slide, "width", true) : utils_elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
            snapGrid = snapGrid.map((snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
            if (allSlidesSize + offsetSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        swiper.emit("slidesUpdated");
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    const toggleSlideClasses$1 = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
    };
    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = this && this.translate || 0;
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
            }
            toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
            toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    const toggleSlideClasses = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
    };
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        let activeSlide;
        let prevSlide;
        let nextSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
            activeSlide = slides.filter((slideEl => slideEl.column === activeIndex))[0];
            nextSlide = slides.filter((slideEl => slideEl.column === activeIndex + 1))[0];
            prevSlide = slides.filter((slideEl => slideEl.column === activeIndex - 1))[0];
        } else activeSlide = slides[activeIndex];
        if (activeSlide) if (!gridEnabled) {
            nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !nextSlide) nextSlide = slides[0];
            prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
        }
        slides.forEach((slideEl => {
            toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
            toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
            toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
        }));
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                if (slideEl.shadowRoot) {
                    lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                    if (lazyEl) lazyEl.remove();
                }
            }));
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map(((_, i) => activeColumn + slidesPerView + i)));
            swiper.slides.forEach(((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            }));
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex && !swiper.params.loop) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
            swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
            const firstSlideInColumn = swiper.slides.filter((slideEl => slideEl.column === activeIndex))[0];
            let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
            if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
            realIndex = Math.floor(activeSlideIndex / params.grid.rows);
        } else if (swiper.slides[activeIndex]) {
            const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
            if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
        } else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            swiper.emit("slideChange");
        }
    }
    function updateClickedSlide(el, path) {
        const swiper = this;
        const params = swiper.params;
        let slide = el.closest(`.${params.slideClass}, swiper-slide`);
        if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
            if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
        }));
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) translate = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (translateBounds === void 0) translateBounds = true;
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    swiper.animating = false;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
            swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
        }
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit(_ref) {
        let {swiper, runCallbacks, direction, step} = _ref;
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) index = 0;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) return false;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        const isInitialVirtual = isVirtual && initial;
        if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
            let targetSlideIndex;
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                targetSlideIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
            } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
            const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
            const {centeredSlides} = swiper.params;
            let slidesPerView = swiper.params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            let needLoopFix = cols - targetSlideIndex < slidesPerView;
            if (centeredSlides) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
            if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) needLoopFix = false;
            if (needLoopFix) {
                const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                swiper.loopFix({
                    direction,
                    slideTo: true,
                    activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                    slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                });
            }
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                newIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
            } else newIndex = swiper.getSlideIndexByData(newIndex);
        }
        requestAnimationFrame((() => {
            swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }));
        return swiper;
    }
    function slideNext(speed, runCallbacks, internal) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled || swiper.destroyed) return swiper;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
            if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                }));
                return true;
            }
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks, internal) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled || swiper.destroyed) return swiper;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
            requestAnimationFrame((() => {
                swiper.slideTo(prevIndex, speed, runCallbacks, internal);
            }));
            return true;
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks, internal) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (runCallbacks === void 0) runCallbacks = true;
        if (threshold === void 0) threshold = .5;
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        if (swiper.destroyed) return;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const initSlides = () => {
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            slides.forEach(((el, index) => {
                el.setAttribute("data-swiper-slide-index", index);
            }));
        };
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
        const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
        const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
        const addBlankSlides = amountOfSlides => {
            for (let i = 0; i < amountOfSlides; i += 1) {
                const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                swiper.slidesEl.append(slideEl);
            }
        };
        if (shouldFillGroup) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else if (shouldFillGrid) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else initSlides();
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix(_temp) {
        let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        const {centeredSlides} = params;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        let slidesPerView = params.slidesPerView;
        if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
            slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
            if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
        }
        const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
        let loopedSlides = slidesPerGroup;
        if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
        loopedSlides += params.loopAdditionalSlides;
        swiper.loopedSlides = loopedSlides;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        if (slides.length < slidesPerView + loopedSlides) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
        const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
        const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
        if (activeColIndexWithShift < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) {
                    const colIndexToPrepend = cols - index - 1;
                    for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                } else prependSlidesIndexes.push(cols - index - 1);
            }
        } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
            slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) slides.forEach(((slide, slideIndex) => {
                    if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                })); else appendSlidesIndexes.push(index);
            }
        }
        swiper.__preventObserver__ = true;
        requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
        if (isPrev) prependSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach(((slide, slideIndex) => {
            swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
        }));
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else if (setTranslate) {
                const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                swiper.touchEventsData.currentTranslate = swiper.translate;
            }
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) {
                    swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                    swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                }
            }
        } else {
            const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix({
                    ...loopParams,
                    slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                ...loopParams,
                slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
            });
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base) {
        if (base === void 0) base = this;
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function preventEdgeSwipe(swiper, event, startX) {
        const window = ssr_window_esm_getWindow();
        const {params} = swiper;
        const edgeSwipeDetection = params.edgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
            if (edgeSwipeDetection === "prevent") {
                event.preventDefault();
                return true;
            }
            return false;
        }
        return true;
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        const data = swiper.touchEventsData;
        if (e.type === "pointerdown") {
            if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
            data.pointerId = e.pointerId;
        } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
        if (e.type === "touchstart") {
            preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
            return;
        }
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = e.composedPath ? e.composedPath() : e.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        if (!preventEdgeSwipe(swiper, e, startX)) return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (e.type === "pointermove") {
            if (data.touchId !== null) return;
            const id = e.pointerId;
            if (id !== data.pointerId) return;
        }
        let targetTouch;
        if (e.type === "touchmove") {
            targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        } else targetTouch = e;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== "mouse") document.activeElement.blur();
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        touches.previousX = touches.currentX;
        touches.previousY = touches.currentY;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
        if (!data.isMoved) {
            if (isLoop && allowLoopFix) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        bySwiperTouchMove: true
                    }
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        (new Date).getTime();
        if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
            Object.assign(touches, {
                startX: pageX,
                startY: pageY,
                currentX: pageX,
                currentY: pageY,
                startTranslate: data.currentTranslate
            });
            data.loopSwapReset = true;
            data.startTranslate = data.currentTranslate;
            return;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetTouch;
        const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
        if (!isTouchEvent) {
            if (data.touchId !== null) return;
            if (e.pointerId !== data.pointerId) return;
            targetTouch = e;
        } else {
            targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        }
        if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
            const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        data.pointerId = null;
        data.touchId = null;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    function onDocumentTouchStart() {
        const swiper = this;
        if (swiper.documentTouchHandlerProceeded) return;
        swiper.documentTouchHandlerProceeded = true;
        if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
    }
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!el || typeof el === "string") return;
        document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
            passive: false,
            capture
        });
        el[domMethod]("touchstart", swiper.onTouchStart, {
            passive: false
        });
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("touchmove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("touchend", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("touchcancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("contextmenu", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasGrabCursor = swiper.params.grabCursor;
        const isGrabCursor = breakpointParams.grabCursor;
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        if (wasGrabCursor && !isGrabCursor) swiper.unsetGrabCursor(); else if (!wasGrabCursor && isGrabCursor) swiper.setGrabCursor();
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        const wasLoop = params.loop;
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        const hasLoop = swiper.params.loop;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (initialized) if (needsReLoop) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (!wasLoop && hasLoop) {
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (wasLoop && !hasLoop) swiper.loopDestroy();
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) base = "window";
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function swiper_core_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        if (!el || typeof el === "string") return;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses: swiper_core_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        eventsPrefix: "swiper",
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopAddBlankSlides: true,
        loopAdditionalSlides: 0,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
            if (obj === void 0) obj = {};
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
            if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class swiper_core_Swiper {
        constructor() {
            let el;
            let params;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new swiper_core_Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getDirectionLabel(property) {
            if (this.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index))[0]);
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
            if (view === void 0) view = "current";
            if (exact === void 0) exact = false;
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (typeof params.slidesPerView === "number") return params.slidesPerView;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += Math.ceil(slides[i].swiperSlideSize);
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
            if (needUpdate === void 0) needUpdate = true;
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
            if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
            lazyElements.forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                if (el && typeof el !== "string") el.removeAttribute("style");
                if (wrapperEl) wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                if (swiper.el && typeof swiper.el !== "string") swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!swiper_core_Swiper.prototype.__modules__) swiper_core_Swiper.prototype.__modules__ = [];
            const modules = swiper_core_Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => swiper_core_Swiper.installModule(m)));
                return swiper_core_Swiper;
            }
            swiper_core_Swiper.installModule(module);
            return swiper_core_Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            swiper_core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    swiper_core_Swiper.use([ Resize, Observer ]);
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            prevEl: null
        };
        function getEl(el) {
            let res;
            if (el && typeof el === "string" && swiper.isElement) {
                res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
                if (res) return res;
            }
            if (el) {
                if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el); else if (res && res.length === 1) res = res[0];
            }
            if (el && !res) return el;
            return res;
        }
        function toggleEl(el, disabled) {
            const params = swiper.params.navigation;
            el = utils_makeElementsArray(el);
            el.forEach((subEl => {
                if (subEl) {
                    subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                    if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }
            }));
        }
        function update() {
            const {nextEl, prevEl} = swiper.navigation;
            if (swiper.params.loop) {
                toggleEl(prevEl, false);
                toggleEl(nextEl, false);
                return;
            }
            toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            let nextEl = getEl(params.nextEl);
            let prevEl = getEl(params.prevEl);
            Object.assign(swiper.navigation, {
                nextEl,
                prevEl
            });
            nextEl = utils_makeElementsArray(nextEl);
            prevEl = utils_makeElementsArray(prevEl);
            const initButton = (el, dir) => {
                if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
            };
            nextEl.forEach((el => initButton(el, "next")));
            prevEl.forEach((el => initButton(el, "prev")));
        }
        function destroy() {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = utils_makeElementsArray(nextEl);
            prevEl = utils_makeElementsArray(prevEl);
            const destroyButton = (el, dir) => {
                el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
            };
            nextEl.forEach((el => destroyButton(el, "next")));
            prevEl.forEach((el => destroyButton(el, "prev")));
        }
        on("init", (() => {
            if (swiper.params.navigation.enabled === false) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = utils_makeElementsArray(nextEl);
            prevEl = utils_makeElementsArray(prevEl);
            if (swiper.enabled) {
                update();
                return;
            }
            [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.add(swiper.params.navigation.lockClass)));
        }));
        on("click", ((_s, e) => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = utils_makeElementsArray(nextEl);
            prevEl = utils_makeElementsArray(prevEl);
            const targetEl = e.target;
            let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
            if (swiper.isElement && !targetIsButton) {
                const path = e.path || e.composedPath && e.composedPath();
                if (path) targetIsButton = path.find((pathEl => nextEl.includes(pathEl) || prevEl.includes(pathEl)));
            }
            if (swiper.params.navigation.hideOnClick && !targetIsButton) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
            init();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function Autoplay(_ref) {
        let {swiper, extendParams, on, emit, params} = _ref;
        swiper.autoplay = {
            running: false,
            paused: false,
            timeLeft: 0
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        let timeout;
        let raf;
        let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayTimeLeft;
        let autoplayStartTime = (new Date).getTime();
        let wasPaused;
        let isTouched;
        let pausedByTouch;
        let touchStartTimeout;
        let slideChanged;
        let pausedByInteraction;
        let pausedByPointerEnter;
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
            if (e.target !== swiper.wrapperEl) return;
            swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
            if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) return;
            resume();
        }
        const calcTimeLeft = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                autoplayDelayCurrent = autoplayTimeLeft;
                wasPaused = false;
            }
            const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
            swiper.autoplay.timeLeft = timeLeft;
            emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
            raf = requestAnimationFrame((() => {
                calcTimeLeft();
            }));
        };
        const getSlideDelay = () => {
            let activeSlideEl;
            if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.filter((slideEl => slideEl.classList.contains("swiper-slide-active")))[0]; else activeSlideEl = swiper.slides[swiper.activeIndex];
            if (!activeSlideEl) return;
            const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
            return currentSlideDelay;
        };
        const run = delayForce => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            cancelAnimationFrame(raf);
            calcTimeLeft();
            let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
            autoplayDelayTotal = swiper.params.autoplay.delay;
            autoplayDelayCurrent = swiper.params.autoplay.delay;
            const currentSlideDelay = getSlideDelay();
            if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                delay = currentSlideDelay;
                autoplayDelayTotal = currentSlideDelay;
                autoplayDelayCurrent = currentSlideDelay;
            }
            autoplayTimeLeft = delay;
            const speed = swiper.params.speed;
            const proceed = () => {
                if (!swiper || swiper.destroyed) return;
                if (swiper.params.autoplay.reverseDirection) {
                    if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                        swiper.slidePrev(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                        emit("autoplay");
                    }
                } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit("autoplay");
                }
                if (swiper.params.cssMode) {
                    autoplayStartTime = (new Date).getTime();
                    requestAnimationFrame((() => {
                        run();
                    }));
                }
            };
            if (delay > 0) {
                clearTimeout(timeout);
                timeout = setTimeout((() => {
                    proceed();
                }), delay);
            } else requestAnimationFrame((() => {
                proceed();
            }));
            return delay;
        };
        const start = () => {
            autoplayStartTime = (new Date).getTime();
            swiper.autoplay.running = true;
            run();
            emit("autoplayStart");
        };
        const stop = () => {
            swiper.autoplay.running = false;
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
            emit("autoplayStop");
        };
        const pause = (internal, reset) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            clearTimeout(timeout);
            if (!internal) pausedByInteraction = true;
            const proceed = () => {
                emit("autoplayPause");
                if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
            };
            swiper.autoplay.paused = true;
            if (reset) {
                if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                slideChanged = false;
                proceed();
                return;
            }
            const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
            autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
            if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
            proceed();
        };
        const resume = () => {
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
            autoplayStartTime = (new Date).getTime();
            if (pausedByInteraction) {
                pausedByInteraction = false;
                run(autoplayTimeLeft);
            } else run();
            swiper.autoplay.paused = false;
            emit("autoplayResume");
        };
        const onVisibilityChange = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            const document = ssr_window_esm_getDocument();
            if (document.visibilityState === "hidden") {
                pausedByInteraction = true;
                pause(true);
            }
            if (document.visibilityState === "visible") resume();
        };
        const onPointerEnter = e => {
            if (e.pointerType !== "mouse") return;
            pausedByInteraction = true;
            pausedByPointerEnter = true;
            if (swiper.animating || swiper.autoplay.paused) return;
            pause(true);
        };
        const onPointerLeave = e => {
            if (e.pointerType !== "mouse") return;
            pausedByPointerEnter = false;
            if (swiper.autoplay.paused) resume();
        };
        const attachMouseEvents = () => {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.el.addEventListener("pointerenter", onPointerEnter);
                swiper.el.addEventListener("pointerleave", onPointerLeave);
            }
        };
        const detachMouseEvents = () => {
            if (swiper.el && typeof swiper.el !== "string") {
                swiper.el.removeEventListener("pointerenter", onPointerEnter);
                swiper.el.removeEventListener("pointerleave", onPointerLeave);
            }
        };
        const attachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.addEventListener("visibilitychange", onVisibilityChange);
        };
        const detachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                attachMouseEvents();
                attachDocumentEvents();
                start();
            }
        }));
        on("destroy", (() => {
            detachMouseEvents();
            detachDocumentEvents();
            if (swiper.autoplay.running) stop();
        }));
        on("_freeModeStaticRelease", (() => {
            if (pausedByTouch || pausedByInteraction) resume();
        }));
        on("_freeModeNoMomentumRelease", (() => {
            if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.params.autoplay.disableOnInteraction) {
                stop();
                return;
            }
            isTouched = true;
            pausedByTouch = false;
            pausedByInteraction = false;
            touchStartTimeout = setTimeout((() => {
                pausedByInteraction = true;
                pausedByTouch = true;
                pause(true);
            }), 200);
        }));
        on("touchEnd", (() => {
            if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
            clearTimeout(touchStartTimeout);
            clearTimeout(timeout);
            if (swiper.params.autoplay.disableOnInteraction) {
                pausedByTouch = false;
                isTouched = false;
                return;
            }
            if (pausedByTouch && swiper.params.cssMode) resume();
            pausedByTouch = false;
            isTouched = false;
        }));
        on("slideChange", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            slideChanged = true;
        }));
        Object.assign(swiper.autoplay, {
            start,
            stop,
            pause,
            resume
        });
    }
    function initSliders() {
        if (document.querySelector(".slider-review-left")) new swiper_core_Swiper(".slider-review-left", {
            modules: [ Autoplay ],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 32,
            initialSlide: 2,
            speed: 4e3,
            loop: true,
            grabCursor: true,
            freeMode: true,
            effect: "fade",
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 1.15,
                    spaceBetween: 20,
                    centeredSlides: true
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 32
                }
            },
            on: {}
        });
        if (document.querySelector(".slider-review-right")) new swiper_core_Swiper(".slider-review-right", {
            modules: [ Autoplay ],
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 32,
            initialSlide: 4,
            speed: 4e3,
            loop: true,
            grabCursor: true,
            freeMode: true,
            effect: "fade",
            autoplay: {
                delay: 0,
                reverseDirection: true,
                disableOnInteraction: false
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 1.15,
                    spaceBetween: 20,
                    centeredSlides: true
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 32
                }
            },
            on: {}
        });
        if (document.querySelector(".slider-trust")) new swiper_core_Swiper(".slider-trust", {
            modules: [ Navigation ],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: true,
            speed: 800,
            navigation: {
                prevEl: ".slider-trust__arrow--prev",
                nextEl: ".slider-trust__arrow--next"
            },
            on: {}
        });
        if (document.querySelector(".slider-events")) new swiper_core_Swiper(".slider-events", {
            modules: [ Navigation ],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 32,
            autoHeight: false,
            speed: 800,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                767: {
                    slidesPerView: 2.5,
                    spaceBetween: 15
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1268: {
                    slidesPerView: 4,
                    spaceBetween: 32
                }
            },
            on: {}
        });
    }
    window.addEventListener("load", (function(e) {
        initSliders();
    }));
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                        let valueOfThreshold;
                        if (item.clientHeight > 2) {
                            valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                            if (valueOfThreshold > 1) valueOfThreshold = 1;
                        } else valueOfThreshold = 1;
                        item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                    }
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            console.log(configWatcher);
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    let addWindowScrollEvent = false;
    function digitsCounter() {
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
            if (digitsCounters.length) digitsCounters.forEach((digitsCounter => {
                if (digitsCounter.hasAttribute("data-go")) return;
                digitsCounter.setAttribute("data-go", "");
                digitsCounter.dataset.digitsCounter = digitsCounter.innerHTML;
                digitsCounter.innerHTML = `0`;
                digitsCountersAnimate(digitsCounter);
            }));
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseFloat(digitsCounter.dataset.digitsCounterSpeed) ? parseFloat(digitsCounter.dataset.digitsCounterSpeed) : 1e3;
            const startValue = parseFloat(digitsCounter.dataset.digitsCounter);
            const format = digitsCounter.dataset.digitsCounterFormat ? digitsCounter.dataset.digitsCounterFormat : " ";
            const startPosition = 0;
            const step = timestamp => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (startPosition + startValue));
                digitsCounter.innerHTML = typeof digitsCounter.dataset.digitsCounterFormat !== "undefined" ? getDigFormat(value, format) : value;
                if (progress < 1) window.requestAnimationFrame(step); else digitsCounter.removeAttribute("data-go");
            };
            window.requestAnimationFrame(step);
        }
        function digitsCounterAction(e) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            if (targetElement.querySelectorAll("[data-digits-counter]").length) digitsCountersInit(targetElement.querySelectorAll("[data-digits-counter]"));
        }
        document.addEventListener("watcherCallback", digitsCounterAction);
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    /*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */
    function round(v) {
        return v + .5 | 0;
    }
    const lim = (v, l, h) => Math.max(Math.min(v, h), l);
    function p2b(v) {
        return lim(round(v * 2.55), 0, 255);
    }
    function n2b(v) {
        return lim(round(v * 255), 0, 255);
    }
    function b2n(v) {
        return lim(round(v / 2.55) / 100, 0, 1);
    }
    function n2p(v) {
        return lim(round(v * 100), 0, 100);
    }
    const map$1 = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    };
    const hex = [ ..."0123456789ABCDEF" ];
    const h1 = b => hex[b & 15];
    const h2 = b => hex[(b & 240) >> 4] + hex[b & 15];
    const eq = b => (b & 240) >> 4 === (b & 15);
    const isShort = v => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
    function hexParse(str) {
        var len = str.length;
        var ret;
        if (str[0] === "#") if (len === 4 || len === 5) ret = {
            r: 255 & map$1[str[1]] * 17,
            g: 255 & map$1[str[2]] * 17,
            b: 255 & map$1[str[3]] * 17,
            a: len === 5 ? map$1[str[4]] * 17 : 255
        }; else if (len === 7 || len === 9) ret = {
            r: map$1[str[1]] << 4 | map$1[str[2]],
            g: map$1[str[3]] << 4 | map$1[str[4]],
            b: map$1[str[5]] << 4 | map$1[str[6]],
            a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
        };
        return ret;
    }
    const alpha = (a, f) => a < 255 ? f(a) : "";
    function hexString(v) {
        var f = isShort(v) ? h1 : h2;
        return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
    }
    const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
    function hsl2rgbn(h, s, l) {
        const a = s * Math.min(l, 1 - l);
        const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return [ f(0), f(8), f(4) ];
    }
    function hsv2rgbn(h, s, v) {
        const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
        return [ f(5), f(3), f(1) ];
    }
    function hwb2rgbn(h, w, b) {
        const rgb = hsl2rgbn(h, 1, .5);
        let i;
        if (w + b > 1) {
            i = 1 / (w + b);
            w *= i;
            b *= i;
        }
        for (i = 0; i < 3; i++) {
            rgb[i] *= 1 - w - b;
            rgb[i] += w;
        }
        return rgb;
    }
    function hueValue(r, g, b, d, max) {
        if (r === max) return (g - b) / d + (g < b ? 6 : 0);
        if (g === max) return (b - r) / d + 2;
        return (r - g) / d + 4;
    }
    function rgb2hsl(v) {
        const range = 255;
        const r = v.r / range;
        const g = v.g / range;
        const b = v.b / range;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h, s, d;
        if (max !== min) {
            d = max - min;
            s = l > .5 ? d / (2 - max - min) : d / (max + min);
            h = hueValue(r, g, b, d, max);
            h = h * 60 + .5;
        }
        return [ h | 0, s || 0, l ];
    }
    function calln(f, a, b, c) {
        return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
    }
    function hsl2rgb(h, s, l) {
        return calln(hsl2rgbn, h, s, l);
    }
    function hwb2rgb(h, w, b) {
        return calln(hwb2rgbn, h, w, b);
    }
    function hsv2rgb(h, s, v) {
        return calln(hsv2rgbn, h, s, v);
    }
    function hue(h) {
        return (h % 360 + 360) % 360;
    }
    function hueParse(str) {
        const m = HUE_RE.exec(str);
        let a = 255;
        let v;
        if (!m) return;
        if (m[5] !== v) a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
        const h = hue(+m[2]);
        const p1 = +m[3] / 100;
        const p2 = +m[4] / 100;
        if (m[1] === "hwb") v = hwb2rgb(h, p1, p2); else if (m[1] === "hsv") v = hsv2rgb(h, p1, p2); else v = hsl2rgb(h, p1, p2);
        return {
            r: v[0],
            g: v[1],
            b: v[2],
            a
        };
    }
    function rotate(v, deg) {
        var h = rgb2hsl(v);
        h[0] = hue(h[0] + deg);
        h = hsl2rgb(h);
        v.r = h[0];
        v.g = h[1];
        v.b = h[2];
    }
    function hslString(v) {
        if (!v) return;
        const a = rgb2hsl(v);
        const h = a[0];
        const s = n2p(a[1]);
        const l = n2p(a[2]);
        return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
    }
    const map = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
    };
    const names$1 = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
    };
    function unpack() {
        const unpacked = {};
        const keys = Object.keys(names$1);
        const tkeys = Object.keys(map);
        let i, j, k, ok, nk;
        for (i = 0; i < keys.length; i++) {
            ok = nk = keys[i];
            for (j = 0; j < tkeys.length; j++) {
                k = tkeys[j];
                nk = nk.replace(k, map[k]);
            }
            k = parseInt(names$1[ok], 16);
            unpacked[nk] = [ k >> 16 & 255, k >> 8 & 255, k & 255 ];
        }
        return unpacked;
    }
    let names;
    function nameParse(str) {
        if (!names) {
            names = unpack();
            names.transparent = [ 0, 0, 0, 0 ];
        }
        const a = names[str.toLowerCase()];
        return a && {
            r: a[0],
            g: a[1],
            b: a[2],
            a: a.length === 4 ? a[3] : 255
        };
    }
    const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
    function rgbParse(str) {
        const m = RGB_RE.exec(str);
        let a = 255;
        let r, g, b;
        if (!m) return;
        if (m[7] !== r) {
            const v = +m[7];
            a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
        }
        r = +m[1];
        g = +m[3];
        b = +m[5];
        r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
        g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
        b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
        return {
            r,
            g,
            b,
            a
        };
    }
    function rgbString(v) {
        return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
    }
    const to = v => v <= .0031308 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - .055;
    const from = v => v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
    function interpolate(rgb1, rgb2, t) {
        const r = from(b2n(rgb1.r));
        const g = from(b2n(rgb1.g));
        const b = from(b2n(rgb1.b));
        return {
            r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
            g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
            b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
            a: rgb1.a + t * (rgb2.a - rgb1.a)
        };
    }
    function modHSL(v, i, ratio) {
        if (v) {
            let tmp = rgb2hsl(v);
            tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
            tmp = hsl2rgb(tmp);
            v.r = tmp[0];
            v.g = tmp[1];
            v.b = tmp[2];
        }
    }
    function clone(v, proto) {
        return v ? Object.assign(proto || {}, v) : v;
    }
    function fromObject(input) {
        var v = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        };
        if (Array.isArray(input)) {
            if (input.length >= 3) {
                v = {
                    r: input[0],
                    g: input[1],
                    b: input[2],
                    a: 255
                };
                if (input.length > 3) v.a = n2b(input[3]);
            }
        } else {
            v = clone(input, {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            });
            v.a = n2b(v.a);
        }
        return v;
    }
    function functionParse(str) {
        if (str.charAt(0) === "r") return rgbParse(str);
        return hueParse(str);
    }
    class Color {
        constructor(input) {
            if (input instanceof Color) return input;
            const type = typeof input;
            let v;
            if (type === "object") v = fromObject(input); else if (type === "string") v = hexParse(input) || nameParse(input) || functionParse(input);
            this._rgb = v;
            this._valid = !!v;
        }
        get valid() {
            return this._valid;
        }
        get rgb() {
            var v = clone(this._rgb);
            if (v) v.a = b2n(v.a);
            return v;
        }
        set rgb(obj) {
            this._rgb = fromObject(obj);
        }
        rgbString() {
            return this._valid ? rgbString(this._rgb) : void 0;
        }
        hexString() {
            return this._valid ? hexString(this._rgb) : void 0;
        }
        hslString() {
            return this._valid ? hslString(this._rgb) : void 0;
        }
        mix(color, weight) {
            if (color) {
                const c1 = this.rgb;
                const c2 = color.rgb;
                let w2;
                const p = weight === w2 ? .5 : weight;
                const w = 2 * p - 1;
                const a = c1.a - c2.a;
                const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
                w2 = 1 - w1;
                c1.r = 255 & w1 * c1.r + w2 * c2.r + .5;
                c1.g = 255 & w1 * c1.g + w2 * c2.g + .5;
                c1.b = 255 & w1 * c1.b + w2 * c2.b + .5;
                c1.a = p * c1.a + (1 - p) * c2.a;
                this.rgb = c1;
            }
            return this;
        }
        interpolate(color, t) {
            if (color) this._rgb = interpolate(this._rgb, color._rgb, t);
            return this;
        }
        clone() {
            return new Color(this.rgb);
        }
        alpha(a) {
            this._rgb.a = n2b(a);
            return this;
        }
        clearer(ratio) {
            const rgb = this._rgb;
            rgb.a *= 1 - ratio;
            return this;
        }
        greyscale() {
            const rgb = this._rgb;
            const val = round(rgb.r * .3 + rgb.g * .59 + rgb.b * .11);
            rgb.r = rgb.g = rgb.b = val;
            return this;
        }
        opaquer(ratio) {
            const rgb = this._rgb;
            rgb.a *= 1 + ratio;
            return this;
        }
        negate() {
            const v = this._rgb;
            v.r = 255 - v.r;
            v.g = 255 - v.g;
            v.b = 255 - v.b;
            return this;
        }
        lighten(ratio) {
            modHSL(this._rgb, 2, ratio);
            return this;
        }
        darken(ratio) {
            modHSL(this._rgb, 2, -ratio);
            return this;
        }
        saturate(ratio) {
            modHSL(this._rgb, 1, ratio);
            return this;
        }
        desaturate(ratio) {
            modHSL(this._rgb, 1, -ratio);
            return this;
        }
        rotate(deg) {
            rotate(this._rgb, deg);
            return this;
        }
    }
    /*!
 * Chart.js v4.4.4
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
    function noop() {}
    const uid = (() => {
        let id = 0;
        return () => id++;
    })();
    function isNullOrUndef(value) {
        return value === null || typeof value === "undefined";
    }
    function isArray(value) {
        if (Array.isArray && Array.isArray(value)) return true;
        const type = Object.prototype.toString.call(value);
        if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") return true;
        return false;
    }
    function helpers_segment_isObject(value) {
        return value !== null && Object.prototype.toString.call(value) === "[object Object]";
    }
    function isNumberFinite(value) {
        return (typeof value === "number" || value instanceof Number) && isFinite(+value);
    }
    function finiteOrDefault(value, defaultValue) {
        return isNumberFinite(value) ? value : defaultValue;
    }
    function valueOrDefault(value, defaultValue) {
        return typeof value === "undefined" ? defaultValue : value;
    }
    const toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : +value / dimension;
    const toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
    function callback(fn, args, thisArg) {
        if (fn && typeof fn.call === "function") return fn.apply(thisArg, args);
    }
    function each(loopable, fn, thisArg, reverse) {
        let i, len, keys;
        if (isArray(loopable)) {
            len = loopable.length;
            if (reverse) for (i = len - 1; i >= 0; i--) fn.call(thisArg, loopable[i], i); else for (i = 0; i < len; i++) fn.call(thisArg, loopable[i], i);
        } else if (helpers_segment_isObject(loopable)) {
            keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) fn.call(thisArg, loopable[keys[i]], keys[i]);
        }
    }
    function _elementsEqual(a0, a1) {
        let i, ilen, v0, v1;
        if (!a0 || !a1 || a0.length !== a1.length) return false;
        for (i = 0, ilen = a0.length; i < ilen; ++i) {
            v0 = a0[i];
            v1 = a1[i];
            if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) return false;
        }
        return true;
    }
    function helpers_segment_clone(source) {
        if (isArray(source)) return source.map(helpers_segment_clone);
        if (helpers_segment_isObject(source)) {
            const target = Object.create(null);
            const keys = Object.keys(source);
            const klen = keys.length;
            let k = 0;
            for (;k < klen; ++k) target[keys[k]] = helpers_segment_clone(source[keys[k]]);
            return target;
        }
        return source;
    }
    function isValidKey(key) {
        return [ "__proto__", "prototype", "constructor" ].indexOf(key) === -1;
    }
    function _merger(key, target, source, options) {
        if (!isValidKey(key)) return;
        const tval = target[key];
        const sval = source[key];
        if (helpers_segment_isObject(tval) && helpers_segment_isObject(sval)) merge(tval, sval, options); else target[key] = helpers_segment_clone(sval);
    }
    function merge(target, source, options) {
        const sources = isArray(source) ? source : [ source ];
        const ilen = sources.length;
        if (!helpers_segment_isObject(target)) return target;
        options = options || {};
        const merger = options.merger || _merger;
        let current;
        for (let i = 0; i < ilen; ++i) {
            current = sources[i];
            if (!helpers_segment_isObject(current)) continue;
            const keys = Object.keys(current);
            for (let k = 0, klen = keys.length; k < klen; ++k) merger(keys[k], target, current, options);
        }
        return target;
    }
    function mergeIf(target, source) {
        return merge(target, source, {
            merger: _mergerIf
        });
    }
    function _mergerIf(key, target, source) {
        if (!isValidKey(key)) return;
        const tval = target[key];
        const sval = source[key];
        if (helpers_segment_isObject(tval) && helpers_segment_isObject(sval)) mergeIf(tval, sval); else if (!Object.prototype.hasOwnProperty.call(target, key)) target[key] = helpers_segment_clone(sval);
    }
    const keyResolvers = {
        "": v => v,
        x: o => o.x,
        y: o => o.y
    };
    function _splitKey(key) {
        const parts = key.split(".");
        const keys = [];
        let tmp = "";
        for (const part of parts) {
            tmp += part;
            if (tmp.endsWith("\\")) tmp = tmp.slice(0, -1) + "."; else {
                keys.push(tmp);
                tmp = "";
            }
        }
        return keys;
    }
    function _getKeyResolver(key) {
        const keys = _splitKey(key);
        return obj => {
            for (const k of keys) {
                if (k === "") break;
                obj = obj && obj[k];
            }
            return obj;
        };
    }
    function resolveObjectKey(obj, key) {
        const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
        return resolver(obj);
    }
    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const defined = value => typeof value !== "undefined";
    const isFunction = value => typeof value === "function";
    const setsEqual = (a, b) => {
        if (a.size !== b.size) return false;
        for (const item of a) if (!b.has(item)) return false;
        return true;
    };
    function _isClickEvent(e) {
        return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
    }
    const PI = Math.PI;
    const TAU = 2 * PI;
    const PITAU = TAU + PI;
    const INFINITY = Number.POSITIVE_INFINITY;
    const RAD_PER_DEG = PI / 180;
    const HALF_PI = PI / 2;
    const QUARTER_PI = PI / 4;
    const TWO_THIRDS_PI = PI * 2 / 3;
    const log10 = Math.log10;
    const sign = Math.sign;
    function almostEquals(x, y, epsilon) {
        return Math.abs(x - y) < epsilon;
    }
    function niceNum(range) {
        const roundedRange = Math.round(range);
        range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
        const niceRange = Math.pow(10, Math.floor(log10(range)));
        const fraction = range / niceRange;
        const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
        return niceFraction * niceRange;
    }
    function _factorize(value) {
        const result = [];
        const sqrt = Math.sqrt(value);
        let i;
        for (i = 1; i < sqrt; i++) if (value % i === 0) {
            result.push(i);
            result.push(value / i);
        }
        if (sqrt === (sqrt | 0)) result.push(sqrt);
        result.sort(((a, b) => a - b)).pop();
        return result;
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function almostWhole(x, epsilon) {
        const rounded = Math.round(x);
        return rounded - epsilon <= x && rounded + epsilon >= x;
    }
    function _setMinAndMaxByKey(array, target, property) {
        let i, ilen, value;
        for (i = 0, ilen = array.length; i < ilen; i++) {
            value = array[i][property];
            if (!isNaN(value)) {
                target.min = Math.min(target.min, value);
                target.max = Math.max(target.max, value);
            }
        }
    }
    function toRadians(degrees) {
        return degrees * (PI / 180);
    }
    function toDegrees(radians) {
        return radians * (180 / PI);
    }
    function _decimalPlaces(x) {
        if (!isNumberFinite(x)) return;
        let e = 1;
        let p = 0;
        while (Math.round(x * e) / e !== x) {
            e *= 10;
            p++;
        }
        return p;
    }
    function getAngleFromPoint(centrePoint, anglePoint) {
        const distanceFromXCenter = anglePoint.x - centrePoint.x;
        const distanceFromYCenter = anglePoint.y - centrePoint.y;
        const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
        let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
        if (angle < -.5 * PI) angle += TAU;
        return {
            angle,
            distance: radialDistanceFromCenter
        };
    }
    function distanceBetweenPoints(pt1, pt2) {
        return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
    }
    function _angleDiff(a, b) {
        return (a - b + PITAU) % TAU - PI;
    }
    function _normalizeAngle(a) {
        return (a % TAU + TAU) % TAU;
    }
    function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
        const a = _normalizeAngle(angle);
        const s = _normalizeAngle(start);
        const e = _normalizeAngle(end);
        const angleToStart = _normalizeAngle(s - a);
        const angleToEnd = _normalizeAngle(e - a);
        const startToAngle = _normalizeAngle(a - s);
        const endToAngle = _normalizeAngle(a - e);
        return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
    }
    function _limitValue(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    function _int16Range(value) {
        return _limitValue(value, -32768, 32767);
    }
    function _isBetween(value, start, end, epsilon = 1e-6) {
        return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
    }
    function _lookup(table, value, cmp) {
        cmp = cmp || (index => table[index] < value);
        let hi = table.length - 1;
        let lo = 0;
        let mid;
        while (hi - lo > 1) {
            mid = lo + hi >> 1;
            if (cmp(mid)) lo = mid; else hi = mid;
        }
        return {
            lo,
            hi
        };
    }
    const _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? index => {
        const ti = table[index][key];
        return ti < value || ti === value && table[index + 1][key] === value;
    } : index => table[index][key] < value);
    const _rlookupByKey = (table, key, value) => _lookup(table, value, (index => table[index][key] >= value));
    function _filterBetween(values, min, max) {
        let start = 0;
        let end = values.length;
        while (start < end && values[start] < min) start++;
        while (end > start && values[end - 1] > max) end--;
        return start > 0 || end < values.length ? values.slice(start, end) : values;
    }
    const arrayEvents = [ "push", "pop", "shift", "splice", "unshift" ];
    function listenArrayEvents(array, listener) {
        if (array._chartjs) {
            array._chartjs.listeners.push(listener);
            return;
        }
        Object.defineProperty(array, "_chartjs", {
            configurable: true,
            enumerable: false,
            value: {
                listeners: [ listener ]
            }
        });
        arrayEvents.forEach((key => {
            const method = "_onData" + _capitalize(key);
            const base = array[key];
            Object.defineProperty(array, key, {
                configurable: true,
                enumerable: false,
                value(...args) {
                    const res = base.apply(this, args);
                    array._chartjs.listeners.forEach((object => {
                        if (typeof object[method] === "function") object[method](...args);
                    }));
                    return res;
                }
            });
        }));
    }
    function unlistenArrayEvents(array, listener) {
        const stub = array._chartjs;
        if (!stub) return;
        const listeners = stub.listeners;
        const index = listeners.indexOf(listener);
        if (index !== -1) listeners.splice(index, 1);
        if (listeners.length > 0) return;
        arrayEvents.forEach((key => {
            delete array[key];
        }));
        delete array._chartjs;
    }
    function _arrayUnique(items) {
        const set = new Set(items);
        if (set.size === items.length) return items;
        return Array.from(set);
    }
    const requestAnimFrame = function() {
        if (typeof window === "undefined") return function(callback) {
            return callback();
        };
        return window.requestAnimationFrame;
    }();
    function throttled(fn, thisArg) {
        let argsToUse = [];
        let ticking = false;
        return function(...args) {
            argsToUse = args;
            if (!ticking) {
                ticking = true;
                requestAnimFrame.call(window, (() => {
                    ticking = false;
                    fn.apply(thisArg, argsToUse);
                }));
            }
        };
    }
    function debounce(fn, delay) {
        let timeout;
        return function(...args) {
            if (delay) {
                clearTimeout(timeout);
                timeout = setTimeout(fn, delay, args);
            } else fn.apply(this, args);
            return delay;
        };
    }
    const _toLeftRightCenter = align => align === "start" ? "left" : align === "end" ? "right" : "center";
    const _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
    const _textX = (align, left, right, rtl) => {
        const check = rtl ? "left" : "right";
        return align === check ? right : align === "center" ? (left + right) / 2 : left;
    };
    function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
        const pointCount = points.length;
        let start = 0;
        let count = pointCount;
        if (meta._sorted) {
            const {iScale, _parsed} = meta;
            const axis = iScale.axis;
            const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
            if (minDefined) start = _limitValue(Math.min(_lookupByKey(_parsed, axis, min).lo, animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo), 0, pointCount - 1);
            if (maxDefined) count = _limitValue(Math.max(_lookupByKey(_parsed, iScale.axis, max, true).hi + 1, animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1), start, pointCount) - start; else count = pointCount - start;
        }
        return {
            start,
            count
        };
    }
    function _scaleRangesChanged(meta) {
        const {xScale, yScale, _scaleRanges} = meta;
        const newRanges = {
            xmin: xScale.min,
            xmax: xScale.max,
            ymin: yScale.min,
            ymax: yScale.max
        };
        if (!_scaleRanges) {
            meta._scaleRanges = newRanges;
            return true;
        }
        const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
        Object.assign(_scaleRanges, newRanges);
        return changed;
    }
    const atEdge = t => t === 0 || t === 1;
    const elasticIn = (t, s, p) => -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p);
    const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
    const effects = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => -t * (t - 2),
        easeInOutQuad: t => (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1),
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (t -= 1) * t * t + 1,
        easeInOutCubic: t => (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2),
        easeInQuart: t => t * t * t * t,
        easeOutQuart: t => -((t -= 1) * t * t * t - 1),
        easeInOutQuart: t => (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2),
        easeInQuint: t => t * t * t * t * t,
        easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
        easeInOutQuint: t => (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2),
        easeInSine: t => -Math.cos(t * HALF_PI) + 1,
        easeOutSine: t => Math.sin(t * HALF_PI),
        easeInOutSine: t => -.5 * (Math.cos(PI * t) - 1),
        easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
        easeOutExpo: t => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
        easeInOutExpo: t => atEdge(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (t * 2 - 1)) : .5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
        easeInCirc: t => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
        easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
        easeInOutCirc: t => (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
        easeInElastic: t => atEdge(t) ? t : elasticIn(t, .075, .3),
        easeOutElastic: t => atEdge(t) ? t : elasticOut(t, .075, .3),
        easeInOutElastic(t) {
            const s = .1125;
            const p = .45;
            return atEdge(t) ? t : t < .5 ? .5 * elasticIn(t * 2, s, p) : .5 + .5 * elasticOut(t * 2 - 1, s, p);
        },
        easeInBack(t) {
            const s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
        easeOutBack(t) {
            const s = 1.70158;
            return (t -= 1) * t * ((s + 1) * t + s) + 1;
        },
        easeInOutBack(t) {
            let s = 1.70158;
            if ((t /= .5) < 1) return .5 * (t * t * (((s *= 1.525) + 1) * t - s));
            return .5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        easeInBounce: t => 1 - effects.easeOutBounce(1 - t),
        easeOutBounce(t) {
            const m = 7.5625;
            const d = 2.75;
            if (t < 1 / d) return m * t * t;
            if (t < 2 / d) return m * (t -= 1.5 / d) * t + .75;
            if (t < 2.5 / d) return m * (t -= 2.25 / d) * t + .9375;
            return m * (t -= 2.625 / d) * t + .984375;
        },
        easeInOutBounce: t => t < .5 ? effects.easeInBounce(t * 2) * .5 : effects.easeOutBounce(t * 2 - 1) * .5 + .5
    };
    function isPatternOrGradient(value) {
        if (value && typeof value === "object") {
            const type = value.toString();
            return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
        }
        return false;
    }
    function color(value) {
        return isPatternOrGradient(value) ? value : new Color(value);
    }
    function getHoverColor(value) {
        return isPatternOrGradient(value) ? value : new Color(value).saturate(.5).darken(.1).hexString();
    }
    const numbers = [ "x", "y", "borderWidth", "radius", "tension" ];
    const colors = [ "color", "borderColor", "backgroundColor" ];
    function applyAnimationsDefaults(defaults) {
        defaults.set("animation", {
            delay: void 0,
            duration: 1e3,
            easing: "easeOutQuart",
            fn: void 0,
            from: void 0,
            loop: void 0,
            to: void 0,
            type: void 0
        });
        defaults.describe("animation", {
            _fallback: false,
            _indexable: false,
            _scriptable: name => name !== "onProgress" && name !== "onComplete" && name !== "fn"
        });
        defaults.set("animations", {
            colors: {
                type: "color",
                properties: colors
            },
            numbers: {
                type: "number",
                properties: numbers
            }
        });
        defaults.describe("animations", {
            _fallback: "animation"
        });
        defaults.set("transitions", {
            active: {
                animation: {
                    duration: 400
                }
            },
            resize: {
                animation: {
                    duration: 0
                }
            },
            show: {
                animations: {
                    colors: {
                        from: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        duration: 0
                    }
                }
            },
            hide: {
                animations: {
                    colors: {
                        to: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        easing: "linear",
                        fn: v => v | 0
                    }
                }
            }
        });
    }
    function applyLayoutsDefaults(defaults) {
        defaults.set("layout", {
            autoPadding: true,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
    }
    const intlCache = new Map;
    function getNumberFormat(locale, options) {
        options = options || {};
        const cacheKey = locale + JSON.stringify(options);
        let formatter = intlCache.get(cacheKey);
        if (!formatter) {
            formatter = new Intl.NumberFormat(locale, options);
            intlCache.set(cacheKey, formatter);
        }
        return formatter;
    }
    function formatNumber(num, locale, options) {
        return getNumberFormat(locale, options).format(num);
    }
    const formatters = {
        values(value) {
            return isArray(value) ? value : "" + value;
        },
        numeric(tickValue, index, ticks) {
            if (tickValue === 0) return "0";
            const locale = this.chart.options.locale;
            let notation;
            let delta = tickValue;
            if (ticks.length > 1) {
                const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
                if (maxTick < 1e-4 || maxTick > 1e15) notation = "scientific";
                delta = calculateDelta(tickValue, ticks);
            }
            const logDelta = log10(Math.abs(delta));
            const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
            const options = {
                notation,
                minimumFractionDigits: numDecimal,
                maximumFractionDigits: numDecimal
            };
            Object.assign(options, this.options.ticks.format);
            return formatNumber(tickValue, locale, options);
        },
        logarithmic(tickValue, index, ticks) {
            if (tickValue === 0) return "0";
            const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
            if ([ 1, 2, 3, 5, 10, 15 ].includes(remain) || index > .8 * ticks.length) return formatters.numeric.call(this, tickValue, index, ticks);
            return "";
        }
    };
    function calculateDelta(tickValue, ticks) {
        let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
        if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) delta = tickValue - Math.floor(tickValue);
        return delta;
    }
    var Ticks = {
        formatters
    };
    function applyScaleDefaults(defaults) {
        defaults.set("scale", {
            display: true,
            offset: false,
            reverse: false,
            beginAtZero: false,
            bounds: "ticks",
            clip: true,
            grace: 0,
            grid: {
                display: true,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                tickWidth: (_ctx, options) => options.lineWidth,
                tickColor: (_ctx, options) => options.color,
                offset: false
            },
            border: {
                display: true,
                dash: [],
                dashOffset: 0,
                width: 1
            },
            title: {
                display: false,
                text: "",
                padding: {
                    top: 4,
                    bottom: 4
                }
            },
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: "",
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                callback: Ticks.formatters.values,
                minor: {},
                major: {},
                align: "center",
                crossAlign: "near",
                showLabelBackdrop: false,
                backdropColor: "rgba(255, 255, 255, 0.75)",
                backdropPadding: 2
            }
        });
        defaults.route("scale.ticks", "color", "", "color");
        defaults.route("scale.grid", "color", "", "borderColor");
        defaults.route("scale.border", "color", "", "borderColor");
        defaults.route("scale.title", "color", "", "color");
        defaults.describe("scale", {
            _fallback: false,
            _scriptable: name => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
            _indexable: name => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
        });
        defaults.describe("scales", {
            _fallback: "scale"
        });
        defaults.describe("scale.ticks", {
            _scriptable: name => name !== "backdropPadding" && name !== "callback",
            _indexable: name => name !== "backdropPadding"
        });
    }
    const overrides = Object.create(null);
    const descriptors = Object.create(null);
    function getScope$1(node, key) {
        if (!key) return node;
        const keys = key.split(".");
        for (let i = 0, n = keys.length; i < n; ++i) {
            const k = keys[i];
            node = node[k] || (node[k] = Object.create(null));
        }
        return node;
    }
    function set(root, scope, values) {
        if (typeof scope === "string") return merge(getScope$1(root, scope), values);
        return merge(getScope$1(root, ""), scope);
    }
    class Defaults {
        constructor(_descriptors, _appliers) {
            this.animation = void 0;
            this.backgroundColor = "rgba(0,0,0,0.1)";
            this.borderColor = "rgba(0,0,0,0.1)";
            this.color = "#666";
            this.datasets = {};
            this.devicePixelRatio = context => context.chart.platform.getDevicePixelRatio();
            this.elements = {};
            this.events = [ "mousemove", "mouseout", "click", "touchstart", "touchmove" ];
            this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null
            };
            this.hover = {};
            this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
            this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
            this.hoverColor = (ctx, options) => getHoverColor(options.color);
            this.indexAxis = "x";
            this.interaction = {
                mode: "nearest",
                intersect: true,
                includeInvisible: false
            };
            this.maintainAspectRatio = true;
            this.onHover = null;
            this.onClick = null;
            this.parsing = true;
            this.plugins = {};
            this.responsive = true;
            this.scale = void 0;
            this.scales = {};
            this.showLine = true;
            this.drawActiveElementsOnTop = true;
            this.describe(_descriptors);
            this.apply(_appliers);
        }
        set(scope, values) {
            return set(this, scope, values);
        }
        get(scope) {
            return getScope$1(this, scope);
        }
        describe(scope, values) {
            return set(descriptors, scope, values);
        }
        override(scope, values) {
            return set(overrides, scope, values);
        }
        route(scope, name, targetScope, targetName) {
            const scopeObject = getScope$1(this, scope);
            const targetScopeObject = getScope$1(this, targetScope);
            const privateName = "_" + name;
            Object.defineProperties(scopeObject, {
                [privateName]: {
                    value: scopeObject[name],
                    writable: true
                },
                [name]: {
                    enumerable: true,
                    get() {
                        const local = this[privateName];
                        const target = targetScopeObject[targetName];
                        if (helpers_segment_isObject(local)) return Object.assign({}, target, local);
                        return valueOrDefault(local, target);
                    },
                    set(value) {
                        this[privateName] = value;
                    }
                }
            });
        }
        apply(appliers) {
            appliers.forEach((apply => apply(this)));
        }
    }
    var helpers_segment_defaults = new Defaults({
        _scriptable: name => !name.startsWith("on"),
        _indexable: name => name !== "events",
        hover: {
            _fallback: "interaction"
        },
        interaction: {
            _scriptable: false,
            _indexable: false
        }
    }, [ applyAnimationsDefaults, applyLayoutsDefaults, applyScaleDefaults ]);
    function toFontString(font) {
        if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) return null;
        return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
    }
    function _measureText(ctx, data, gc, longest, string) {
        let textWidth = data[string];
        if (!textWidth) {
            textWidth = data[string] = ctx.measureText(string).width;
            gc.push(string);
        }
        if (textWidth > longest) longest = textWidth;
        return longest;
    }
    function _longestText(ctx, font, arrayOfThings, cache) {
        cache = cache || {};
        let data = cache.data = cache.data || {};
        let gc = cache.garbageCollect = cache.garbageCollect || [];
        if (cache.font !== font) {
            data = cache.data = {};
            gc = cache.garbageCollect = [];
            cache.font = font;
        }
        ctx.save();
        ctx.font = font;
        let longest = 0;
        const ilen = arrayOfThings.length;
        let i, j, jlen, thing, nestedThing;
        for (i = 0; i < ilen; i++) {
            thing = arrayOfThings[i];
            if (thing !== void 0 && thing !== null && !isArray(thing)) longest = _measureText(ctx, data, gc, longest, thing); else if (isArray(thing)) for (j = 0, 
            jlen = thing.length; j < jlen; j++) {
                nestedThing = thing[j];
                if (nestedThing !== void 0 && nestedThing !== null && !isArray(nestedThing)) longest = _measureText(ctx, data, gc, longest, nestedThing);
            }
        }
        ctx.restore();
        const gcLen = gc.length / 2;
        if (gcLen > arrayOfThings.length) {
            for (i = 0; i < gcLen; i++) delete data[gc[i]];
            gc.splice(0, gcLen);
        }
        return longest;
    }
    function _alignPixel(chart, pixel, width) {
        const devicePixelRatio = chart.currentDevicePixelRatio;
        const halfWidth = width !== 0 ? Math.max(width / 2, .5) : 0;
        return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
    }
    function clearCanvas(canvas, ctx) {
        if (!ctx && !canvas) return;
        ctx = ctx || canvas.getContext("2d");
        ctx.save();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    function drawPoint(ctx, options, x, y) {
        drawPointLegend(ctx, options, x, y, null);
    }
    function drawPointLegend(ctx, options, x, y, w) {
        let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
        const style = options.pointStyle;
        const rotation = options.rotation;
        const radius = options.radius;
        let rad = (rotation || 0) * RAD_PER_DEG;
        if (style && typeof style === "object") {
            type = style.toString();
            if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rad);
                ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
                ctx.restore();
                return;
            }
        }
        if (isNaN(radius) || radius <= 0) return;
        ctx.beginPath();
        switch (style) {
          default:
            if (w) ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU); else ctx.arc(x, y, radius, 0, TAU);
            ctx.closePath();
            break;

          case "triangle":
            width = w ? w / 2 : radius;
            ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            ctx.closePath();
            break;

          case "rectRounded":
            cornerRadius = radius * .516;
            size = radius - cornerRadius;
            xOffset = Math.cos(rad + QUARTER_PI) * size;
            xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            yOffset = Math.sin(rad + QUARTER_PI) * size;
            yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
            ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
            ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
            ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
            ctx.closePath();
            break;

          case "rect":
            if (!rotation) {
                size = Math.SQRT1_2 * radius;
                width = w ? w / 2 : size;
                ctx.rect(x - width, y - size, 2 * width, 2 * size);
                break;
            }
            rad += QUARTER_PI;

          case "rectRot":
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            ctx.closePath();
            break;

          case "crossRot":
            rad += QUARTER_PI;

          case "cross":
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;

          case "star":
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            rad += QUARTER_PI;
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;

          case "line":
            xOffset = w ? w / 2 : Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x - xOffset, y - yOffset);
            ctx.lineTo(x + xOffset, y + yOffset);
            break;

          case "dash":
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
            break;

          case false:
            ctx.closePath();
            break;
        }
        ctx.fill();
        if (options.borderWidth > 0) ctx.stroke();
    }
    function _isPointInArea(point, area, margin) {
        margin = margin || .5;
        return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
    }
    function clipArea(ctx, area) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
        ctx.clip();
    }
    function unclipArea(ctx) {
        ctx.restore();
    }
    function _steppedLineTo(ctx, previous, target, flip, mode) {
        if (!previous) return ctx.lineTo(target.x, target.y);
        if (mode === "middle") {
            const midpoint = (previous.x + target.x) / 2;
            ctx.lineTo(midpoint, previous.y);
            ctx.lineTo(midpoint, target.y);
        } else if (mode === "after" !== !!flip) ctx.lineTo(previous.x, target.y); else ctx.lineTo(target.x, previous.y);
        ctx.lineTo(target.x, target.y);
    }
    function _bezierCurveTo(ctx, previous, target, flip) {
        if (!previous) return ctx.lineTo(target.x, target.y);
        ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
    }
    function setRenderOpts(ctx, opts) {
        if (opts.translation) ctx.translate(opts.translation[0], opts.translation[1]);
        if (!isNullOrUndef(opts.rotation)) ctx.rotate(opts.rotation);
        if (opts.color) ctx.fillStyle = opts.color;
        if (opts.textAlign) ctx.textAlign = opts.textAlign;
        if (opts.textBaseline) ctx.textBaseline = opts.textBaseline;
    }
    function decorateText(ctx, x, y, line, opts) {
        if (opts.strikethrough || opts.underline) {
            const metrics = ctx.measureText(line);
            const left = x - metrics.actualBoundingBoxLeft;
            const right = x + metrics.actualBoundingBoxRight;
            const top = y - metrics.actualBoundingBoxAscent;
            const bottom = y + metrics.actualBoundingBoxDescent;
            const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.beginPath();
            ctx.lineWidth = opts.decorationWidth || 2;
            ctx.moveTo(left, yDecoration);
            ctx.lineTo(right, yDecoration);
            ctx.stroke();
        }
    }
    function drawBackdrop(ctx, opts) {
        const oldColor = ctx.fillStyle;
        ctx.fillStyle = opts.color;
        ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
        ctx.fillStyle = oldColor;
    }
    function renderText(ctx, text, x, y, font, opts = {}) {
        const lines = isArray(text) ? text : [ text ];
        const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
        let i, line;
        ctx.save();
        ctx.font = font.string;
        setRenderOpts(ctx, opts);
        for (i = 0; i < lines.length; ++i) {
            line = lines[i];
            if (opts.backdrop) drawBackdrop(ctx, opts.backdrop);
            if (stroke) {
                if (opts.strokeColor) ctx.strokeStyle = opts.strokeColor;
                if (!isNullOrUndef(opts.strokeWidth)) ctx.lineWidth = opts.strokeWidth;
                ctx.strokeText(line, x, y, opts.maxWidth);
            }
            ctx.fillText(line, x, y, opts.maxWidth);
            decorateText(ctx, x, y, line, opts);
            y += Number(font.lineHeight);
        }
        ctx.restore();
    }
    function addRoundedRectPath(ctx, rect) {
        const {x, y, w, h, radius} = rect;
        ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
        ctx.lineTo(x, y + h - radius.bottomLeft);
        ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
        ctx.lineTo(x + w - radius.bottomRight, y + h);
        ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
        ctx.lineTo(x + w, y + radius.topRight);
        ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
        ctx.lineTo(x + radius.topLeft, y);
    }
    const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
    const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
    function toLineHeight(value, size) {
        const matches = ("" + value).match(LINE_HEIGHT);
        if (!matches || matches[1] === "normal") return size * 1.2;
        value = +matches[2];
        switch (matches[3]) {
          case "px":
            return value;

          case "%":
            value /= 100;
            break;
        }
        return size * value;
    }
    const numberOrZero = v => +v || 0;
    function _readValueToProps(value, props) {
        const ret = {};
        const objProps = helpers_segment_isObject(props);
        const keys = objProps ? Object.keys(props) : props;
        const read = helpers_segment_isObject(value) ? objProps ? prop => valueOrDefault(value[prop], value[props[prop]]) : prop => value[prop] : () => value;
        for (const prop of keys) ret[prop] = numberOrZero(read(prop));
        return ret;
    }
    function toTRBL(value) {
        return _readValueToProps(value, {
            top: "y",
            right: "x",
            bottom: "y",
            left: "x"
        });
    }
    function toTRBLCorners(value) {
        return _readValueToProps(value, [ "topLeft", "topRight", "bottomLeft", "bottomRight" ]);
    }
    function toPadding(value) {
        const obj = toTRBL(value);
        obj.width = obj.left + obj.right;
        obj.height = obj.top + obj.bottom;
        return obj;
    }
    function toFont(options, fallback) {
        options = options || {};
        fallback = fallback || helpers_segment_defaults.font;
        let size = valueOrDefault(options.size, fallback.size);
        if (typeof size === "string") size = parseInt(size, 10);
        let style = valueOrDefault(options.style, fallback.style);
        if (style && !("" + style).match(FONT_STYLE)) {
            console.warn('Invalid font style specified: "' + style + '"');
            style = void 0;
        }
        const font = {
            family: valueOrDefault(options.family, fallback.family),
            lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
            size,
            style,
            weight: valueOrDefault(options.weight, fallback.weight),
            string: ""
        };
        font.string = toFontString(font);
        return font;
    }
    function resolve(inputs, context, index, info) {
        let cacheable = true;
        let i, ilen, value;
        for (i = 0, ilen = inputs.length; i < ilen; ++i) {
            value = inputs[i];
            if (value === void 0) continue;
            if (context !== void 0 && typeof value === "function") {
                value = value(context);
                cacheable = false;
            }
            if (index !== void 0 && isArray(value)) {
                value = value[index % value.length];
                cacheable = false;
            }
            if (value !== void 0) {
                if (info && !cacheable) info.cacheable = false;
                return value;
            }
        }
    }
    function _addGrace(minmax, grace, beginAtZero) {
        const {min, max} = minmax;
        const change = toDimension(grace, (max - min) / 2);
        const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
        return {
            min: keepZero(min, -Math.abs(change)),
            max: keepZero(max, change)
        };
    }
    function createContext(parentContext, context) {
        return Object.assign(Object.create(parentContext), context);
    }
    function _createResolver(scopes, prefixes = [ "" ], rootScopes, fallback, getTarget = () => scopes[0]) {
        const finalRootScopes = rootScopes || scopes;
        if (typeof fallback === "undefined") fallback = _resolve("_fallback", scopes);
        const cache = {
            [Symbol.toStringTag]: "Object",
            _cacheable: true,
            _scopes: scopes,
            _rootScopes: finalRootScopes,
            _fallback: fallback,
            _getTarget: getTarget,
            override: scope => _createResolver([ scope, ...scopes ], prefixes, finalRootScopes, fallback)
        };
        return new Proxy(cache, {
            deleteProperty(target, prop) {
                delete target[prop];
                delete target._keys;
                delete scopes[0][prop];
                return true;
            },
            get(target, prop) {
                return _cached(target, prop, (() => _resolveWithPrefixes(prop, prefixes, scopes, target)));
            },
            getOwnPropertyDescriptor(target, prop) {
                return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
            },
            getPrototypeOf() {
                return Reflect.getPrototypeOf(scopes[0]);
            },
            has(target, prop) {
                return getKeysFromAllScopes(target).includes(prop);
            },
            ownKeys(target) {
                return getKeysFromAllScopes(target);
            },
            set(target, prop, value) {
                const storage = target._storage || (target._storage = getTarget());
                target[prop] = storage[prop] = value;
                delete target._keys;
                return true;
            }
        });
    }
    function _attachContext(proxy, context, subProxy, descriptorDefaults) {
        const cache = {
            _cacheable: false,
            _proxy: proxy,
            _context: context,
            _subProxy: subProxy,
            _stack: new Set,
            _descriptors: _descriptors(proxy, descriptorDefaults),
            setContext: ctx => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
            override: scope => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
        };
        return new Proxy(cache, {
            deleteProperty(target, prop) {
                delete target[prop];
                delete proxy[prop];
                return true;
            },
            get(target, prop, receiver) {
                return _cached(target, prop, (() => _resolveWithContext(target, prop, receiver)));
            },
            getOwnPropertyDescriptor(target, prop) {
                return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
                    enumerable: true,
                    configurable: true
                } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
            },
            getPrototypeOf() {
                return Reflect.getPrototypeOf(proxy);
            },
            has(target, prop) {
                return Reflect.has(proxy, prop);
            },
            ownKeys() {
                return Reflect.ownKeys(proxy);
            },
            set(target, prop, value) {
                proxy[prop] = value;
                delete target[prop];
                return true;
            }
        });
    }
    function _descriptors(proxy, defaults = {
        scriptable: true,
        indexable: true
    }) {
        const {_scriptable = defaults.scriptable, _indexable = defaults.indexable, _allKeys = defaults.allKeys} = proxy;
        return {
            allKeys: _allKeys,
            scriptable: _scriptable,
            indexable: _indexable,
            isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
            isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
        };
    }
    const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
    const needsSubResolver = (prop, value) => helpers_segment_isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
    function _cached(target, prop, resolve) {
        if (Object.prototype.hasOwnProperty.call(target, prop) || prop === "constructor") return target[prop];
        const value = resolve();
        target[prop] = value;
        return value;
    }
    function _resolveWithContext(target, prop, receiver) {
        const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
        let value = _proxy[prop];
        if (isFunction(value) && descriptors.isScriptable(prop)) value = _resolveScriptable(prop, value, target, receiver);
        if (isArray(value) && value.length) value = _resolveArray(prop, value, target, descriptors.isIndexable);
        if (needsSubResolver(prop, value)) value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
        return value;
    }
    function _resolveScriptable(prop, getValue, target, receiver) {
        const {_proxy, _context, _subProxy, _stack} = target;
        if (_stack.has(prop)) throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
        _stack.add(prop);
        let value = getValue(_context, _subProxy || receiver);
        _stack.delete(prop);
        if (needsSubResolver(prop, value)) value = createSubResolver(_proxy._scopes, _proxy, prop, value);
        return value;
    }
    function _resolveArray(prop, value, target, isIndexable) {
        const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
        if (typeof _context.index !== "undefined" && isIndexable(prop)) return value[_context.index % value.length]; else if (helpers_segment_isObject(value[0])) {
            const arr = value;
            const scopes = _proxy._scopes.filter((s => s !== arr));
            value = [];
            for (const item of arr) {
                const resolver = createSubResolver(scopes, _proxy, prop, item);
                value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
            }
        }
        return value;
    }
    function resolveFallback(fallback, prop, value) {
        return isFunction(fallback) ? fallback(prop, value) : fallback;
    }
    const getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
    function addScopes(set, parentScopes, key, parentFallback, value) {
        for (const parent of parentScopes) {
            const scope = getScope(key, parent);
            if (scope) {
                set.add(scope);
                const fallback = resolveFallback(scope._fallback, key, value);
                if (typeof fallback !== "undefined" && fallback !== key && fallback !== parentFallback) return fallback;
            } else if (scope === false && typeof parentFallback !== "undefined" && key !== parentFallback) return null;
        }
        return false;
    }
    function createSubResolver(parentScopes, resolver, prop, value) {
        const rootScopes = resolver._rootScopes;
        const fallback = resolveFallback(resolver._fallback, prop, value);
        const allScopes = [ ...parentScopes, ...rootScopes ];
        const set = new Set;
        set.add(value);
        let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
        if (key === null) return false;
        if (typeof fallback !== "undefined" && fallback !== prop) {
            key = addScopesFromKey(set, allScopes, fallback, key, value);
            if (key === null) return false;
        }
        return _createResolver(Array.from(set), [ "" ], rootScopes, fallback, (() => subGetTarget(resolver, prop, value)));
    }
    function addScopesFromKey(set, allScopes, key, fallback, item) {
        while (key) key = addScopes(set, allScopes, key, fallback, item);
        return key;
    }
    function subGetTarget(resolver, prop, value) {
        const parent = resolver._getTarget();
        if (!(prop in parent)) parent[prop] = {};
        const target = parent[prop];
        if (isArray(target) && helpers_segment_isObject(value)) return value;
        return target || {};
    }
    function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
        let value;
        for (const prefix of prefixes) {
            value = _resolve(readKey(prefix, prop), scopes);
            if (typeof value !== "undefined") return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
        }
    }
    function _resolve(key, scopes) {
        for (const scope of scopes) {
            if (!scope) continue;
            const value = scope[key];
            if (typeof value !== "undefined") return value;
        }
    }
    function getKeysFromAllScopes(target) {
        let keys = target._keys;
        if (!keys) keys = target._keys = resolveKeysFromAllScopes(target._scopes);
        return keys;
    }
    function resolveKeysFromAllScopes(scopes) {
        const set = new Set;
        for (const scope of scopes) for (const key of Object.keys(scope).filter((k => !k.startsWith("_")))) set.add(key);
        return Array.from(set);
    }
    function _parseObjectDataRadialScale(meta, data, start, count) {
        const {iScale} = meta;
        const {key = "r"} = this._parsing;
        const parsed = new Array(count);
        let i, ilen, index, item;
        for (i = 0, ilen = count; i < ilen; ++i) {
            index = i + start;
            item = data[index];
            parsed[i] = {
                r: iScale.parse(resolveObjectKey(item, key), index)
            };
        }
        return parsed;
    }
    const EPSILON = Number.EPSILON || 1e-14;
    const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
    const getValueAxis = indexAxis => indexAxis === "x" ? "y" : "x";
    function splineCurve(firstPoint, middlePoint, afterPoint, t) {
        const previous = firstPoint.skip ? middlePoint : firstPoint;
        const current = middlePoint;
        const next = afterPoint.skip ? middlePoint : afterPoint;
        const d01 = distanceBetweenPoints(current, previous);
        const d12 = distanceBetweenPoints(next, current);
        let s01 = d01 / (d01 + d12);
        let s12 = d12 / (d01 + d12);
        s01 = isNaN(s01) ? 0 : s01;
        s12 = isNaN(s12) ? 0 : s12;
        const fa = t * s01;
        const fb = t * s12;
        return {
            previous: {
                x: current.x - fa * (next.x - previous.x),
                y: current.y - fa * (next.y - previous.y)
            },
            next: {
                x: current.x + fb * (next.x - previous.x),
                y: current.y + fb * (next.y - previous.y)
            }
        };
    }
    function monotoneAdjust(points, deltaK, mK) {
        const pointsLen = points.length;
        let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (let i = 0; i < pointsLen - 1; ++i) {
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent || !pointAfter) continue;
            if (almostEquals(deltaK[i], 0, EPSILON)) {
                mK[i] = mK[i + 1] = 0;
                continue;
            }
            alphaK = mK[i] / deltaK[i];
            betaK = mK[i + 1] / deltaK[i];
            squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
            if (squaredMagnitude <= 9) continue;
            tauK = 3 / Math.sqrt(squaredMagnitude);
            mK[i] = alphaK * tauK * deltaK[i];
            mK[i + 1] = betaK * tauK * deltaK[i];
        }
    }
    function monotoneCompute(points, mK, indexAxis = "x") {
        const valueAxis = getValueAxis(indexAxis);
        const pointsLen = points.length;
        let delta, pointBefore, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (let i = 0; i < pointsLen; ++i) {
            pointBefore = pointCurrent;
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent) continue;
            const iPixel = pointCurrent[indexAxis];
            const vPixel = pointCurrent[valueAxis];
            if (pointBefore) {
                delta = (iPixel - pointBefore[indexAxis]) / 3;
                pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
                pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
            }
            if (pointAfter) {
                delta = (pointAfter[indexAxis] - iPixel) / 3;
                pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
                pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
            }
        }
    }
    function splineCurveMonotone(points, indexAxis = "x") {
        const valueAxis = getValueAxis(indexAxis);
        const pointsLen = points.length;
        const deltaK = Array(pointsLen).fill(0);
        const mK = Array(pointsLen);
        let i, pointBefore, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (i = 0; i < pointsLen; ++i) {
            pointBefore = pointCurrent;
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent) continue;
            if (pointAfter) {
                const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
                deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
            }
            mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
        }
        monotoneAdjust(points, deltaK, mK);
        monotoneCompute(points, mK, indexAxis);
    }
    function capControlPoint(pt, min, max) {
        return Math.max(Math.min(pt, max), min);
    }
    function capBezierPoints(points, area) {
        let i, ilen, point, inArea, inAreaPrev;
        let inAreaNext = _isPointInArea(points[0], area);
        for (i = 0, ilen = points.length; i < ilen; ++i) {
            inAreaPrev = inArea;
            inArea = inAreaNext;
            inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
            if (!inArea) continue;
            point = points[i];
            if (inAreaPrev) {
                point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
                point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
            }
            if (inAreaNext) {
                point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
                point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
            }
        }
    }
    function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
        let i, ilen, point, controlPoints;
        if (options.spanGaps) points = points.filter((pt => !pt.skip));
        if (options.cubicInterpolationMode === "monotone") splineCurveMonotone(points, indexAxis); else {
            let prev = loop ? points[points.length - 1] : points[0];
            for (i = 0, ilen = points.length; i < ilen; ++i) {
                point = points[i];
                controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
                point.cp1x = controlPoints.previous.x;
                point.cp1y = controlPoints.previous.y;
                point.cp2x = controlPoints.next.x;
                point.cp2y = controlPoints.next.y;
                prev = point;
            }
        }
        if (options.capBezierPoints) capBezierPoints(points, area);
    }
    function _isDomSupported() {
        return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function _getParentNode(domNode) {
        let parent = domNode.parentNode;
        if (parent && parent.toString() === "[object ShadowRoot]") parent = parent.host;
        return parent;
    }
    function parseMaxStyle(styleValue, node, parentProperty) {
        let valueInPixels;
        if (typeof styleValue === "string") {
            valueInPixels = parseInt(styleValue, 10);
            if (styleValue.indexOf("%") !== -1) valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
        } else valueInPixels = styleValue;
        return valueInPixels;
    }
    const helpers_segment_getComputedStyle = element => element.ownerDocument.defaultView.getComputedStyle(element, null);
    function getStyle(el, property) {
        return helpers_segment_getComputedStyle(el).getPropertyValue(property);
    }
    const positions = [ "top", "right", "bottom", "left" ];
    function getPositionedStyle(styles, style, suffix) {
        const result = {};
        suffix = suffix ? "-" + suffix : "";
        for (let i = 0; i < 4; i++) {
            const pos = positions[i];
            result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
        }
        result.width = result.left + result.right;
        result.height = result.top + result.bottom;
        return result;
    }
    const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
    function getCanvasPosition(e, canvas) {
        const touches = e.touches;
        const source = touches && touches.length ? touches[0] : e;
        const {offsetX, offsetY} = source;
        let box = false;
        let x, y;
        if (useOffsetPos(offsetX, offsetY, e.target)) {
            x = offsetX;
            y = offsetY;
        } else {
            const rect = canvas.getBoundingClientRect();
            x = source.clientX - rect.left;
            y = source.clientY - rect.top;
            box = true;
        }
        return {
            x,
            y,
            box
        };
    }
    function getRelativePosition(event, chart) {
        if ("native" in event) return event;
        const {canvas, currentDevicePixelRatio} = chart;
        const style = helpers_segment_getComputedStyle(canvas);
        const borderBox = style.boxSizing === "border-box";
        const paddings = getPositionedStyle(style, "padding");
        const borders = getPositionedStyle(style, "border", "width");
        const {x, y, box} = getCanvasPosition(event, canvas);
        const xOffset = paddings.left + (box && borders.left);
        const yOffset = paddings.top + (box && borders.top);
        let {width, height} = chart;
        if (borderBox) {
            width -= paddings.width + borders.width;
            height -= paddings.height + borders.height;
        }
        return {
            x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
            y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
        };
    }
    function getContainerSize(canvas, width, height) {
        let maxWidth, maxHeight;
        if (width === void 0 || height === void 0) {
            const container = canvas && _getParentNode(canvas);
            if (!container) {
                width = canvas.clientWidth;
                height = canvas.clientHeight;
            } else {
                const rect = container.getBoundingClientRect();
                const containerStyle = helpers_segment_getComputedStyle(container);
                const containerBorder = getPositionedStyle(containerStyle, "border", "width");
                const containerPadding = getPositionedStyle(containerStyle, "padding");
                width = rect.width - containerPadding.width - containerBorder.width;
                height = rect.height - containerPadding.height - containerBorder.height;
                maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
                maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
            }
        }
        return {
            width,
            height,
            maxWidth: maxWidth || INFINITY,
            maxHeight: maxHeight || INFINITY
        };
    }
    const round1 = v => Math.round(v * 10) / 10;
    function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
        const style = helpers_segment_getComputedStyle(canvas);
        const margins = getPositionedStyle(style, "margin");
        const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
        const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
        const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
        let {width, height} = containerSize;
        if (style.boxSizing === "content-box") {
            const borders = getPositionedStyle(style, "border", "width");
            const paddings = getPositionedStyle(style, "padding");
            width -= paddings.width + borders.width;
            height -= paddings.height + borders.height;
        }
        width = Math.max(0, width - margins.width);
        height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
        width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
        height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
        if (width && !height) height = round1(width / 2);
        const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
        if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
            height = containerSize.height;
            width = round1(Math.floor(height * aspectRatio));
        }
        return {
            width,
            height
        };
    }
    function retinaScale(chart, forceRatio, forceStyle) {
        const pixelRatio = forceRatio || 1;
        const deviceHeight = Math.floor(chart.height * pixelRatio);
        const deviceWidth = Math.floor(chart.width * pixelRatio);
        chart.height = Math.floor(chart.height);
        chart.width = Math.floor(chart.width);
        const canvas = chart.canvas;
        if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
            canvas.style.height = `${chart.height}px`;
            canvas.style.width = `${chart.width}px`;
        }
        if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
            chart.currentDevicePixelRatio = pixelRatio;
            canvas.height = deviceHeight;
            canvas.width = deviceWidth;
            chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            return true;
        }
        return false;
    }
    const supportsEventListenerOptions = function() {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            if (_isDomSupported()) {
                window.addEventListener("test", null, options);
                window.removeEventListener("test", null, options);
            }
        } catch (e) {}
        return passiveSupported;
    }();
    function readUsedSize(element, property) {
        const value = getStyle(element, property);
        const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
        return matches ? +matches[1] : void 0;
    }
    function _pointInLine(p1, p2, t, mode) {
        return {
            x: p1.x + t * (p2.x - p1.x),
            y: p1.y + t * (p2.y - p1.y)
        };
    }
    function _steppedInterpolation(p1, p2, t, mode) {
        return {
            x: p1.x + t * (p2.x - p1.x),
            y: mode === "middle" ? t < .5 ? p1.y : p2.y : mode === "after" ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
        };
    }
    function _bezierInterpolation(p1, p2, t, mode) {
        const cp1 = {
            x: p1.cp2x,
            y: p1.cp2y
        };
        const cp2 = {
            x: p2.cp1x,
            y: p2.cp1y
        };
        const a = _pointInLine(p1, cp1, t);
        const b = _pointInLine(cp1, cp2, t);
        const c = _pointInLine(cp2, p2, t);
        const d = _pointInLine(a, b, t);
        const e = _pointInLine(b, c, t);
        return _pointInLine(d, e, t);
    }
    const getRightToLeftAdapter = function(rectX, width) {
        return {
            x(x) {
                return rectX + rectX + width - x;
            },
            setWidth(w) {
                width = w;
            },
            textAlign(align) {
                if (align === "center") return align;
                return align === "right" ? "left" : "right";
            },
            xPlus(x, value) {
                return x - value;
            },
            leftForLtr(x, itemWidth) {
                return x - itemWidth;
            }
        };
    };
    const getLeftToRightAdapter = function() {
        return {
            x(x) {
                return x;
            },
            setWidth(w) {},
            textAlign(align) {
                return align;
            },
            xPlus(x, value) {
                return x + value;
            },
            leftForLtr(x, _itemWidth) {
                return x;
            }
        };
    };
    function getRtlAdapter(rtl, rectX, width) {
        return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
    }
    function overrideTextDirection(ctx, direction) {
        let style, original;
        if (direction === "ltr" || direction === "rtl") {
            style = ctx.canvas.style;
            original = [ style.getPropertyValue("direction"), style.getPropertyPriority("direction") ];
            style.setProperty("direction", direction, "important");
            ctx.prevTextDirection = original;
        }
    }
    function restoreTextDirection(ctx, original) {
        if (original !== void 0) {
            delete ctx.prevTextDirection;
            ctx.canvas.style.setProperty("direction", original[0], original[1]);
        }
    }
    function propertyFn(property) {
        if (property === "angle") return {
            between: _angleBetween,
            compare: _angleDiff,
            normalize: _normalizeAngle
        };
        return {
            between: _isBetween,
            compare: (a, b) => a - b,
            normalize: x => x
        };
    }
    function normalizeSegment({start, end, count, loop, style}) {
        return {
            start: start % count,
            end: end % count,
            loop: loop && (end - start + 1) % count === 0,
            style
        };
    }
    function getSegment(segment, points, bounds) {
        const {property, start: startBound, end: endBound} = bounds;
        const {between, normalize} = propertyFn(property);
        const count = points.length;
        let {start, end, loop} = segment;
        let i, ilen;
        if (loop) {
            start += count;
            end += count;
            for (i = 0, ilen = count; i < ilen; ++i) {
                if (!between(normalize(points[start % count][property]), startBound, endBound)) break;
                start--;
                end--;
            }
            start %= count;
            end %= count;
        }
        if (end < start) end += count;
        return {
            start,
            end,
            loop,
            style: segment.style
        };
    }
    function _boundSegment(segment, points, bounds) {
        if (!bounds) return [ segment ];
        const {property, start: startBound, end: endBound} = bounds;
        const count = points.length;
        const {compare, between, normalize} = propertyFn(property);
        const {start, end, loop, style} = getSegment(segment, points, bounds);
        const result = [];
        let inside = false;
        let subStart = null;
        let value, point, prevValue;
        const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
        const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
        const shouldStart = () => inside || startIsBefore();
        const shouldStop = () => !inside || endIsBefore();
        for (let i = start, prev = start; i <= end; ++i) {
            point = points[i % count];
            if (point.skip) continue;
            value = normalize(point[property]);
            if (value === prevValue) continue;
            inside = between(value, startBound, endBound);
            if (subStart === null && shouldStart()) subStart = compare(value, startBound) === 0 ? i : prev;
            if (subStart !== null && shouldStop()) {
                result.push(normalizeSegment({
                    start: subStart,
                    end: i,
                    loop,
                    count,
                    style
                }));
                subStart = null;
            }
            prev = i;
            prevValue = value;
        }
        if (subStart !== null) result.push(normalizeSegment({
            start: subStart,
            end,
            loop,
            count,
            style
        }));
        return result;
    }
    function _boundSegments(line, bounds) {
        const result = [];
        const segments = line.segments;
        for (let i = 0; i < segments.length; i++) {
            const sub = _boundSegment(segments[i], line.points, bounds);
            if (sub.length) result.push(...sub);
        }
        return result;
    }
    function findStartAndEnd(points, count, loop, spanGaps) {
        let start = 0;
        let end = count - 1;
        if (loop && !spanGaps) while (start < count && !points[start].skip) start++;
        while (start < count && points[start].skip) start++;
        start %= count;
        if (loop) end += start;
        while (end > start && points[end % count].skip) end--;
        end %= count;
        return {
            start,
            end
        };
    }
    function solidSegments(points, start, max, loop) {
        const count = points.length;
        const result = [];
        let last = start;
        let prev = points[start];
        let end;
        for (end = start + 1; end <= max; ++end) {
            const cur = points[end % count];
            if (cur.skip || cur.stop) {
                if (!prev.skip) {
                    loop = false;
                    result.push({
                        start: start % count,
                        end: (end - 1) % count,
                        loop
                    });
                    start = last = cur.stop ? end : null;
                }
            } else {
                last = end;
                if (prev.skip) start = end;
            }
            prev = cur;
        }
        if (last !== null) result.push({
            start: start % count,
            end: last % count,
            loop
        });
        return result;
    }
    function _computeSegments(line, segmentOptions) {
        const points = line.points;
        const spanGaps = line.options.spanGaps;
        const count = points.length;
        if (!count) return [];
        const loop = !!line._loop;
        const {start, end} = findStartAndEnd(points, count, loop, spanGaps);
        if (spanGaps === true) return splitByStyles(line, [ {
            start,
            end,
            loop
        } ], points, segmentOptions);
        const max = end < start ? end + count : end;
        const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
        return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
    }
    function splitByStyles(line, segments, points, segmentOptions) {
        if (!segmentOptions || !segmentOptions.setContext || !points) return segments;
        return doSplitByStyles(line, segments, points, segmentOptions);
    }
    function doSplitByStyles(line, segments, points, segmentOptions) {
        const chartContext = line._chart.getContext();
        const baseStyle = readStyle(line.options);
        const {_datasetIndex: datasetIndex, options: {spanGaps}} = line;
        const count = points.length;
        const result = [];
        let prevStyle = baseStyle;
        let start = segments[0].start;
        let i = start;
        function addStyle(s, e, l, st) {
            const dir = spanGaps ? -1 : 1;
            if (s === e) return;
            s += count;
            while (points[s % count].skip) s -= dir;
            while (points[e % count].skip) e += dir;
            if (s % count !== e % count) {
                result.push({
                    start: s % count,
                    end: e % count,
                    loop: l,
                    style: st
                });
                prevStyle = st;
                start = e % count;
            }
        }
        for (const segment of segments) {
            start = spanGaps ? start : segment.start;
            let prev = points[start % count];
            let style;
            for (i = start + 1; i <= segment.end; i++) {
                const pt = points[i % count];
                style = readStyle(segmentOptions.setContext(createContext(chartContext, {
                    type: "segment",
                    p0: prev,
                    p1: pt,
                    p0DataIndex: (i - 1) % count,
                    p1DataIndex: i % count,
                    datasetIndex
                })));
                if (styleChanged(style, prevStyle)) addStyle(start, i - 1, segment.loop, prevStyle);
                prev = pt;
                prevStyle = style;
            }
            if (start < i - 1) addStyle(start, i - 1, segment.loop, prevStyle);
        }
        return result;
    }
    function readStyle(options) {
        return {
            backgroundColor: options.backgroundColor,
            borderCapStyle: options.borderCapStyle,
            borderDash: options.borderDash,
            borderDashOffset: options.borderDashOffset,
            borderJoinStyle: options.borderJoinStyle,
            borderWidth: options.borderWidth,
            borderColor: options.borderColor
        };
    }
    function styleChanged(style, prevStyle) {
        if (!prevStyle) return false;
        const cache = [];
        const replacer = function(key, value) {
            if (!isPatternOrGradient(value)) return value;
            if (!cache.includes(value)) cache.push(value);
            return cache.indexOf(value);
        };
        return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
    }
    /*!
 * Chart.js v4.4.4
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
    class Animator {
        constructor() {
            this._request = null;
            this._charts = new Map;
            this._running = false;
            this._lastDate = void 0;
        }
        _notify(chart, anims, date, type) {
            const callbacks = anims.listeners[type];
            const numSteps = anims.duration;
            callbacks.forEach((fn => fn({
                chart,
                initial: anims.initial,
                numSteps,
                currentStep: Math.min(date - anims.start, numSteps)
            })));
        }
        _refresh() {
            if (this._request) return;
            this._running = true;
            this._request = requestAnimFrame.call(window, (() => {
                this._update();
                this._request = null;
                if (this._running) this._refresh();
            }));
        }
        _update(date = Date.now()) {
            let remaining = 0;
            this._charts.forEach(((anims, chart) => {
                if (!anims.running || !anims.items.length) return;
                const items = anims.items;
                let i = items.length - 1;
                let draw = false;
                let item;
                for (;i >= 0; --i) {
                    item = items[i];
                    if (item._active) {
                        if (item._total > anims.duration) anims.duration = item._total;
                        item.tick(date);
                        draw = true;
                    } else {
                        items[i] = items[items.length - 1];
                        items.pop();
                    }
                }
                if (draw) {
                    chart.draw();
                    this._notify(chart, anims, date, "progress");
                }
                if (!items.length) {
                    anims.running = false;
                    this._notify(chart, anims, date, "complete");
                    anims.initial = false;
                }
                remaining += items.length;
            }));
            this._lastDate = date;
            if (remaining === 0) this._running = false;
        }
        _getAnims(chart) {
            const charts = this._charts;
            let anims = charts.get(chart);
            if (!anims) {
                anims = {
                    running: false,
                    initial: true,
                    items: [],
                    listeners: {
                        complete: [],
                        progress: []
                    }
                };
                charts.set(chart, anims);
            }
            return anims;
        }
        listen(chart, event, cb) {
            this._getAnims(chart).listeners[event].push(cb);
        }
        add(chart, items) {
            if (!items || !items.length) return;
            this._getAnims(chart).items.push(...items);
        }
        has(chart) {
            return this._getAnims(chart).items.length > 0;
        }
        start(chart) {
            const anims = this._charts.get(chart);
            if (!anims) return;
            anims.running = true;
            anims.start = Date.now();
            anims.duration = anims.items.reduce(((acc, cur) => Math.max(acc, cur._duration)), 0);
            this._refresh();
        }
        running(chart) {
            if (!this._running) return false;
            const anims = this._charts.get(chart);
            if (!anims || !anims.running || !anims.items.length) return false;
            return true;
        }
        stop(chart) {
            const anims = this._charts.get(chart);
            if (!anims || !anims.items.length) return;
            const items = anims.items;
            let i = items.length - 1;
            for (;i >= 0; --i) items[i].cancel();
            anims.items = [];
            this._notify(chart, anims, Date.now(), "complete");
        }
        remove(chart) {
            return this._charts.delete(chart);
        }
    }
    var animator = new Animator;
    const transparent = "transparent";
    const interpolators = {
        boolean(from, to, factor) {
            return factor > .5 ? to : from;
        },
        color(from, to, factor) {
            const c0 = color(from || transparent);
            const c1 = c0.valid && color(to || transparent);
            return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
        },
        number(from, to, factor) {
            return from + (to - from) * factor;
        }
    };
    class Animation {
        constructor(cfg, target, prop, to) {
            const currentValue = target[prop];
            to = resolve([ cfg.to, to, currentValue, cfg.from ]);
            const from = resolve([ cfg.from, currentValue, to ]);
            this._active = true;
            this._fn = cfg.fn || interpolators[cfg.type || typeof from];
            this._easing = effects[cfg.easing] || effects.linear;
            this._start = Math.floor(Date.now() + (cfg.delay || 0));
            this._duration = this._total = Math.floor(cfg.duration);
            this._loop = !!cfg.loop;
            this._target = target;
            this._prop = prop;
            this._from = from;
            this._to = to;
            this._promises = void 0;
        }
        active() {
            return this._active;
        }
        update(cfg, to, date) {
            if (this._active) {
                this._notify(false);
                const currentValue = this._target[this._prop];
                const elapsed = date - this._start;
                const remain = this._duration - elapsed;
                this._start = date;
                this._duration = Math.floor(Math.max(remain, cfg.duration));
                this._total += elapsed;
                this._loop = !!cfg.loop;
                this._to = resolve([ cfg.to, to, currentValue, cfg.from ]);
                this._from = resolve([ cfg.from, currentValue, to ]);
            }
        }
        cancel() {
            if (this._active) {
                this.tick(Date.now());
                this._active = false;
                this._notify(false);
            }
        }
        tick(date) {
            const elapsed = date - this._start;
            const duration = this._duration;
            const prop = this._prop;
            const from = this._from;
            const loop = this._loop;
            const to = this._to;
            let factor;
            this._active = from !== to && (loop || elapsed < duration);
            if (!this._active) {
                this._target[prop] = to;
                this._notify(true);
                return;
            }
            if (elapsed < 0) {
                this._target[prop] = from;
                return;
            }
            factor = elapsed / duration % 2;
            factor = loop && factor > 1 ? 2 - factor : factor;
            factor = this._easing(Math.min(1, Math.max(0, factor)));
            this._target[prop] = this._fn(from, to, factor);
        }
        wait() {
            const promises = this._promises || (this._promises = []);
            return new Promise(((res, rej) => {
                promises.push({
                    res,
                    rej
                });
            }));
        }
        _notify(resolved) {
            const method = resolved ? "res" : "rej";
            const promises = this._promises || [];
            for (let i = 0; i < promises.length; i++) promises[i][method]();
        }
    }
    class Animations {
        constructor(chart, config) {
            this._chart = chart;
            this._properties = new Map;
            this.configure(config);
        }
        configure(config) {
            if (!helpers_segment_isObject(config)) return;
            const animationOptions = Object.keys(helpers_segment_defaults.animation);
            const animatedProps = this._properties;
            Object.getOwnPropertyNames(config).forEach((key => {
                const cfg = config[key];
                if (!helpers_segment_isObject(cfg)) return;
                const resolved = {};
                for (const option of animationOptions) resolved[option] = cfg[option];
                (isArray(cfg.properties) && cfg.properties || [ key ]).forEach((prop => {
                    if (prop === key || !animatedProps.has(prop)) animatedProps.set(prop, resolved);
                }));
            }));
        }
        _animateOptions(target, values) {
            const newOptions = values.options;
            const options = resolveTargetOptions(target, newOptions);
            if (!options) return [];
            const animations = this._createAnimations(options, newOptions);
            if (newOptions.$shared) awaitAll(target.options.$animations, newOptions).then((() => {
                target.options = newOptions;
            }), (() => {}));
            return animations;
        }
        _createAnimations(target, values) {
            const animatedProps = this._properties;
            const animations = [];
            const running = target.$animations || (target.$animations = {});
            const props = Object.keys(values);
            const date = Date.now();
            let i;
            for (i = props.length - 1; i >= 0; --i) {
                const prop = props[i];
                if (prop.charAt(0) === "$") continue;
                if (prop === "options") {
                    animations.push(...this._animateOptions(target, values));
                    continue;
                }
                const value = values[prop];
                let animation = running[prop];
                const cfg = animatedProps.get(prop);
                if (animation) if (cfg && animation.active()) {
                    animation.update(cfg, value, date);
                    continue;
                } else animation.cancel();
                if (!cfg || !cfg.duration) {
                    target[prop] = value;
                    continue;
                }
                running[prop] = animation = new Animation(cfg, target, prop, value);
                animations.push(animation);
            }
            return animations;
        }
        update(target, values) {
            if (this._properties.size === 0) {
                Object.assign(target, values);
                return;
            }
            const animations = this._createAnimations(target, values);
            if (animations.length) {
                animator.add(this._chart, animations);
                return true;
            }
        }
    }
    function awaitAll(animations, properties) {
        const running = [];
        const keys = Object.keys(properties);
        for (let i = 0; i < keys.length; i++) {
            const anim = animations[keys[i]];
            if (anim && anim.active()) running.push(anim.wait());
        }
        return Promise.all(running);
    }
    function resolveTargetOptions(target, newOptions) {
        if (!newOptions) return;
        let options = target.options;
        if (!options) {
            target.options = newOptions;
            return;
        }
        if (options.$shared) target.options = options = Object.assign({}, options, {
            $shared: false,
            $animations: {}
        });
        return options;
    }
    function scaleClip(scale, allowedOverflow) {
        const opts = scale && scale.options || {};
        const reverse = opts.reverse;
        const min = opts.min === void 0 ? allowedOverflow : 0;
        const max = opts.max === void 0 ? allowedOverflow : 0;
        return {
            start: reverse ? max : min,
            end: reverse ? min : max
        };
    }
    function defaultClip(xScale, yScale, allowedOverflow) {
        if (allowedOverflow === false) return false;
        const x = scaleClip(xScale, allowedOverflow);
        const y = scaleClip(yScale, allowedOverflow);
        return {
            top: y.end,
            right: x.end,
            bottom: y.start,
            left: x.start
        };
    }
    function toClip(value) {
        let t, r, b, l;
        if (helpers_segment_isObject(value)) {
            t = value.top;
            r = value.right;
            b = value.bottom;
            l = value.left;
        } else t = r = b = l = value;
        return {
            top: t,
            right: r,
            bottom: b,
            left: l,
            disabled: value === false
        };
    }
    function getSortedDatasetIndices(chart, filterVisible) {
        const keys = [];
        const metasets = chart._getSortedDatasetMetas(filterVisible);
        let i, ilen;
        for (i = 0, ilen = metasets.length; i < ilen; ++i) keys.push(metasets[i].index);
        return keys;
    }
    function applyStack(stack, value, dsIndex, options = {}) {
        const keys = stack.keys;
        const singleMode = options.mode === "single";
        let i, ilen, datasetIndex, otherValue;
        if (value === null) return;
        for (i = 0, ilen = keys.length; i < ilen; ++i) {
            datasetIndex = +keys[i];
            if (datasetIndex === dsIndex) {
                if (options.all) continue;
                break;
            }
            otherValue = stack.values[datasetIndex];
            if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) value += otherValue;
        }
        return value;
    }
    function convertObjectDataToArray(data, meta) {
        const {iScale, vScale} = meta;
        const iAxisKey = iScale.axis === "x" ? "x" : "y";
        const vAxisKey = vScale.axis === "x" ? "x" : "y";
        const keys = Object.keys(data);
        const adata = new Array(keys.length);
        let i, ilen, key;
        for (i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            adata[i] = {
                [iAxisKey]: key,
                [vAxisKey]: data[key]
            };
        }
        return adata;
    }
    function isStacked(scale, meta) {
        const stacked = scale && scale.options.stacked;
        return stacked || stacked === void 0 && meta.stack !== void 0;
    }
    function getStackKey(indexScale, valueScale, meta) {
        return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
    }
    function getUserBounds(scale) {
        const {min, max, minDefined, maxDefined} = scale.getUserBounds();
        return {
            min: minDefined ? min : Number.NEGATIVE_INFINITY,
            max: maxDefined ? max : Number.POSITIVE_INFINITY
        };
    }
    function getOrCreateStack(stacks, stackKey, indexValue) {
        const subStack = stacks[stackKey] || (stacks[stackKey] = {});
        return subStack[indexValue] || (subStack[indexValue] = {});
    }
    function getLastIndexInStack(stack, vScale, positive, type) {
        for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
            const value = stack[meta.index];
            if (positive && value > 0 || !positive && value < 0) return meta.index;
        }
        return null;
    }
    function updateStacks(controller, parsed) {
        const {chart, _cachedMeta: meta} = controller;
        const stacks = chart._stacks || (chart._stacks = {});
        const {iScale, vScale, index: datasetIndex} = meta;
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const key = getStackKey(iScale, vScale, meta);
        const ilen = parsed.length;
        let stack;
        for (let i = 0; i < ilen; ++i) {
            const item = parsed[i];
            const {[iAxis]: index, [vAxis]: value} = item;
            const itemStacks = item._stacks || (item._stacks = {});
            stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
            stack[datasetIndex] = value;
            stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
            stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
            const visualValues = stack._visualValues || (stack._visualValues = {});
            visualValues[datasetIndex] = value;
        }
    }
    function getFirstScaleId(chart, axis) {
        const scales = chart.scales;
        return Object.keys(scales).filter((key => scales[key].axis === axis)).shift();
    }
    function createDatasetContext(parent, index) {
        return createContext(parent, {
            active: false,
            dataset: void 0,
            datasetIndex: index,
            index,
            mode: "default",
            type: "dataset"
        });
    }
    function createDataContext(parent, index, element) {
        return createContext(parent, {
            active: false,
            dataIndex: index,
            parsed: void 0,
            raw: void 0,
            element,
            index,
            mode: "default",
            type: "data"
        });
    }
    function clearStacks(meta, items) {
        const datasetIndex = meta.controller.index;
        const axis = meta.vScale && meta.vScale.axis;
        if (!axis) return;
        items = items || meta._parsed;
        for (const parsed of items) {
            const stacks = parsed._stacks;
            if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) return;
            delete stacks[axis][datasetIndex];
            if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) delete stacks[axis]._visualValues[datasetIndex];
        }
    }
    const isDirectUpdateMode = mode => mode === "reset" || mode === "none";
    const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
    const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
        keys: getSortedDatasetIndices(chart, true),
        values: null
    };
    class DatasetController {
        static defaults={};
        static datasetElementType=null;
        static dataElementType=null;
        constructor(chart, datasetIndex) {
            this.chart = chart;
            this._ctx = chart.ctx;
            this.index = datasetIndex;
            this._cachedDataOpts = {};
            this._cachedMeta = this.getMeta();
            this._type = this._cachedMeta.type;
            this.options = void 0;
            this._parsing = false;
            this._data = void 0;
            this._objectData = void 0;
            this._sharedOptions = void 0;
            this._drawStart = void 0;
            this._drawCount = void 0;
            this.enableOptionSharing = false;
            this.supportsDecimation = false;
            this.$context = void 0;
            this._syncList = [];
            this.datasetElementType = new.target.datasetElementType;
            this.dataElementType = new.target.dataElementType;
            this.initialize();
        }
        initialize() {
            const meta = this._cachedMeta;
            this.configure();
            this.linkScales();
            meta._stacked = isStacked(meta.vScale, meta);
            this.addElements();
            if (this.options.fill && !this.chart.isPluginEnabled("filler")) console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
        }
        updateIndex(datasetIndex) {
            if (this.index !== datasetIndex) clearStacks(this._cachedMeta);
            this.index = datasetIndex;
        }
        linkScales() {
            const chart = this.chart;
            const meta = this._cachedMeta;
            const dataset = this.getDataset();
            const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
            const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
            const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
            const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
            const indexAxis = meta.indexAxis;
            const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
            const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
            meta.xScale = this.getScaleForId(xid);
            meta.yScale = this.getScaleForId(yid);
            meta.rScale = this.getScaleForId(rid);
            meta.iScale = this.getScaleForId(iid);
            meta.vScale = this.getScaleForId(vid);
        }
        getDataset() {
            return this.chart.data.datasets[this.index];
        }
        getMeta() {
            return this.chart.getDatasetMeta(this.index);
        }
        getScaleForId(scaleID) {
            return this.chart.scales[scaleID];
        }
        _getOtherScale(scale) {
            const meta = this._cachedMeta;
            return scale === meta.iScale ? meta.vScale : meta.iScale;
        }
        reset() {
            this._update("reset");
        }
        _destroy() {
            const meta = this._cachedMeta;
            if (this._data) unlistenArrayEvents(this._data, this);
            if (meta._stacked) clearStacks(meta);
        }
        _dataCheck() {
            const dataset = this.getDataset();
            const data = dataset.data || (dataset.data = []);
            const _data = this._data;
            if (helpers_segment_isObject(data)) {
                const meta = this._cachedMeta;
                this._data = convertObjectDataToArray(data, meta);
            } else if (_data !== data) {
                if (_data) {
                    unlistenArrayEvents(_data, this);
                    const meta = this._cachedMeta;
                    clearStacks(meta);
                    meta._parsed = [];
                }
                if (data && Object.isExtensible(data)) listenArrayEvents(data, this);
                this._syncList = [];
                this._data = data;
            }
        }
        addElements() {
            const meta = this._cachedMeta;
            this._dataCheck();
            if (this.datasetElementType) meta.dataset = new this.datasetElementType;
        }
        buildOrUpdateElements(resetNewElements) {
            const meta = this._cachedMeta;
            const dataset = this.getDataset();
            let stackChanged = false;
            this._dataCheck();
            const oldStacked = meta._stacked;
            meta._stacked = isStacked(meta.vScale, meta);
            if (meta.stack !== dataset.stack) {
                stackChanged = true;
                clearStacks(meta);
                meta.stack = dataset.stack;
            }
            this._resyncElements(resetNewElements);
            if (stackChanged || oldStacked !== meta._stacked) updateStacks(this, meta._parsed);
        }
        configure() {
            const config = this.chart.config;
            const scopeKeys = config.datasetScopeKeys(this._type);
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
            this.options = config.createResolver(scopes, this.getContext());
            this._parsing = this.options.parsing;
            this._cachedDataOpts = {};
        }
        parse(start, count) {
            const {_cachedMeta: meta, _data: data} = this;
            const {iScale, _stacked} = meta;
            const iAxis = iScale.axis;
            let sorted = start === 0 && count === data.length ? true : meta._sorted;
            let prev = start > 0 && meta._parsed[start - 1];
            let i, cur, parsed;
            if (this._parsing === false) {
                meta._parsed = data;
                meta._sorted = true;
                parsed = data;
            } else {
                if (isArray(data[start])) parsed = this.parseArrayData(meta, data, start, count); else if (helpers_segment_isObject(data[start])) parsed = this.parseObjectData(meta, data, start, count); else parsed = this.parsePrimitiveData(meta, data, start, count);
                const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
                for (i = 0; i < count; ++i) {
                    meta._parsed[i + start] = cur = parsed[i];
                    if (sorted) {
                        if (isNotInOrderComparedToPrev()) sorted = false;
                        prev = cur;
                    }
                }
                meta._sorted = sorted;
            }
            if (_stacked) updateStacks(this, parsed);
        }
        parsePrimitiveData(meta, data, start, count) {
            const {iScale, vScale} = meta;
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const labels = iScale.getLabels();
            const singleScale = iScale === vScale;
            const parsed = new Array(count);
            let i, ilen, index;
            for (i = 0, ilen = count; i < ilen; ++i) {
                index = i + start;
                parsed[i] = {
                    [iAxis]: singleScale || iScale.parse(labels[index], index),
                    [vAxis]: vScale.parse(data[index], index)
                };
            }
            return parsed;
        }
        parseArrayData(meta, data, start, count) {
            const {xScale, yScale} = meta;
            const parsed = new Array(count);
            let i, ilen, index, item;
            for (i = 0, ilen = count; i < ilen; ++i) {
                index = i + start;
                item = data[index];
                parsed[i] = {
                    x: xScale.parse(item[0], index),
                    y: yScale.parse(item[1], index)
                };
            }
            return parsed;
        }
        parseObjectData(meta, data, start, count) {
            const {xScale, yScale} = meta;
            const {xAxisKey = "x", yAxisKey = "y"} = this._parsing;
            const parsed = new Array(count);
            let i, ilen, index, item;
            for (i = 0, ilen = count; i < ilen; ++i) {
                index = i + start;
                item = data[index];
                parsed[i] = {
                    x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
                    y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
                };
            }
            return parsed;
        }
        getParsed(index) {
            return this._cachedMeta._parsed[index];
        }
        getDataElement(index) {
            return this._cachedMeta.data[index];
        }
        applyStack(scale, parsed, mode) {
            const chart = this.chart;
            const meta = this._cachedMeta;
            const value = parsed[scale.axis];
            const stack = {
                keys: getSortedDatasetIndices(chart, true),
                values: parsed._stacks[scale.axis]._visualValues
            };
            return applyStack(stack, value, meta.index, {
                mode
            });
        }
        updateRangeFromParsed(range, scale, parsed, stack) {
            const parsedValue = parsed[scale.axis];
            let value = parsedValue === null ? NaN : parsedValue;
            const values = stack && parsed._stacks[scale.axis];
            if (stack && values) {
                stack.values = values;
                value = applyStack(stack, parsedValue, this._cachedMeta.index);
            }
            range.min = Math.min(range.min, value);
            range.max = Math.max(range.max, value);
        }
        getMinMax(scale, canStack) {
            const meta = this._cachedMeta;
            const _parsed = meta._parsed;
            const sorted = meta._sorted && scale === meta.iScale;
            const ilen = _parsed.length;
            const otherScale = this._getOtherScale(scale);
            const stack = createStack(canStack, meta, this.chart);
            const range = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
            const {min: otherMin, max: otherMax} = getUserBounds(otherScale);
            let i, parsed;
            function _skip() {
                parsed = _parsed[i];
                const otherValue = parsed[otherScale.axis];
                return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
            }
            for (i = 0; i < ilen; ++i) {
                if (_skip()) continue;
                this.updateRangeFromParsed(range, scale, parsed, stack);
                if (sorted) break;
            }
            if (sorted) for (i = ilen - 1; i >= 0; --i) {
                if (_skip()) continue;
                this.updateRangeFromParsed(range, scale, parsed, stack);
                break;
            }
            return range;
        }
        getAllParsedValues(scale) {
            const parsed = this._cachedMeta._parsed;
            const values = [];
            let i, ilen, value;
            for (i = 0, ilen = parsed.length; i < ilen; ++i) {
                value = parsed[i][scale.axis];
                if (isNumberFinite(value)) values.push(value);
            }
            return values;
        }
        getMaxOverflow() {
            return false;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const iScale = meta.iScale;
            const vScale = meta.vScale;
            const parsed = this.getParsed(index);
            return {
                label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
                value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
            };
        }
        _update(mode) {
            const meta = this._cachedMeta;
            this.update(mode || "default");
            meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
        }
        update(mode) {}
        draw() {
            const ctx = this._ctx;
            const chart = this.chart;
            const meta = this._cachedMeta;
            const elements = meta.data || [];
            const area = chart.chartArea;
            const active = [];
            const start = this._drawStart || 0;
            const count = this._drawCount || elements.length - start;
            const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
            let i;
            if (meta.dataset) meta.dataset.draw(ctx, area, start, count);
            for (i = start; i < start + count; ++i) {
                const element = elements[i];
                if (element.hidden) continue;
                if (element.active && drawActiveElementsOnTop) active.push(element); else element.draw(ctx, area);
            }
            for (i = 0; i < active.length; ++i) active[i].draw(ctx, area);
        }
        getStyle(index, active) {
            const mode = active ? "active" : "default";
            return index === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
        }
        getContext(index, active, mode) {
            const dataset = this.getDataset();
            let context;
            if (index >= 0 && index < this._cachedMeta.data.length) {
                const element = this._cachedMeta.data[index];
                context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
                context.parsed = this.getParsed(index);
                context.raw = dataset.data[index];
                context.index = context.dataIndex = index;
            } else {
                context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
                context.dataset = dataset;
                context.index = context.datasetIndex = this.index;
            }
            context.active = !!active;
            context.mode = mode;
            return context;
        }
        resolveDatasetElementOptions(mode) {
            return this._resolveElementOptions(this.datasetElementType.id, mode);
        }
        resolveDataElementOptions(index, mode) {
            return this._resolveElementOptions(this.dataElementType.id, mode, index);
        }
        _resolveElementOptions(elementType, mode = "default", index) {
            const active = mode === "active";
            const cache = this._cachedDataOpts;
            const cacheKey = elementType + "-" + mode;
            const cached = cache[cacheKey];
            const sharing = this.enableOptionSharing && defined(index);
            if (cached) return cloneIfNotShared(cached, sharing);
            const config = this.chart.config;
            const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
            const prefixes = active ? [ `${elementType}Hover`, "hover", elementType, "" ] : [ elementType, "" ];
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
            const names = Object.keys(helpers_segment_defaults.elements[elementType]);
            const context = () => this.getContext(index, active, mode);
            const values = config.resolveNamedOptions(scopes, names, context, prefixes);
            if (values.$shared) {
                values.$shared = sharing;
                cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
            }
            return values;
        }
        _resolveAnimations(index, transition, active) {
            const chart = this.chart;
            const cache = this._cachedDataOpts;
            const cacheKey = `animation-${transition}`;
            const cached = cache[cacheKey];
            if (cached) return cached;
            let options;
            if (chart.options.animation !== false) {
                const config = this.chart.config;
                const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
                const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
                options = config.createResolver(scopes, this.getContext(index, active, transition));
            }
            const animations = new Animations(chart, options && options.animations);
            if (options && options._cacheable) cache[cacheKey] = Object.freeze(animations);
            return animations;
        }
        getSharedOptions(options) {
            if (!options.$shared) return;
            return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
        }
        includeOptions(mode, sharedOptions) {
            return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
        }
        _getSharedOptions(start, mode) {
            const firstOpts = this.resolveDataElementOptions(start, mode);
            const previouslySharedOptions = this._sharedOptions;
            const sharedOptions = this.getSharedOptions(firstOpts);
            const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
            this.updateSharedOptions(sharedOptions, mode, firstOpts);
            return {
                sharedOptions,
                includeOptions
            };
        }
        updateElement(element, index, properties, mode) {
            if (isDirectUpdateMode(mode)) Object.assign(element, properties); else this._resolveAnimations(index, mode).update(element, properties);
        }
        updateSharedOptions(sharedOptions, mode, newOptions) {
            if (sharedOptions && !isDirectUpdateMode(mode)) this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
        }
        _setStyle(element, index, mode, active) {
            element.active = active;
            const options = this.getStyle(index, active);
            this._resolveAnimations(index, mode, active).update(element, {
                options: !active && this.getSharedOptions(options) || options
            });
        }
        removeHoverStyle(element, datasetIndex, index) {
            this._setStyle(element, index, "active", false);
        }
        setHoverStyle(element, datasetIndex, index) {
            this._setStyle(element, index, "active", true);
        }
        _removeDatasetHoverStyle() {
            const element = this._cachedMeta.dataset;
            if (element) this._setStyle(element, void 0, "active", false);
        }
        _setDatasetHoverStyle() {
            const element = this._cachedMeta.dataset;
            if (element) this._setStyle(element, void 0, "active", true);
        }
        _resyncElements(resetNewElements) {
            const data = this._data;
            const elements = this._cachedMeta.data;
            for (const [method, arg1, arg2] of this._syncList) this[method](arg1, arg2);
            this._syncList = [];
            const numMeta = elements.length;
            const numData = data.length;
            const count = Math.min(numData, numMeta);
            if (count) this.parse(0, count);
            if (numData > numMeta) this._insertElements(numMeta, numData - numMeta, resetNewElements); else if (numData < numMeta) this._removeElements(numData, numMeta - numData);
        }
        _insertElements(start, count, resetNewElements = true) {
            const meta = this._cachedMeta;
            const data = meta.data;
            const end = start + count;
            let i;
            const move = arr => {
                arr.length += count;
                for (i = arr.length - 1; i >= end; i--) arr[i] = arr[i - count];
            };
            move(data);
            for (i = start; i < end; ++i) data[i] = new this.dataElementType;
            if (this._parsing) move(meta._parsed);
            this.parse(start, count);
            if (resetNewElements) this.updateElements(data, start, count, "reset");
        }
        updateElements(element, start, count, mode) {}
        _removeElements(start, count) {
            const meta = this._cachedMeta;
            if (this._parsing) {
                const removed = meta._parsed.splice(start, count);
                if (meta._stacked) clearStacks(meta, removed);
            }
            meta.data.splice(start, count);
        }
        _sync(args) {
            if (this._parsing) this._syncList.push(args); else {
                const [method, arg1, arg2] = args;
                this[method](arg1, arg2);
            }
            this.chart._dataChanges.push([ this.index, ...args ]);
        }
        _onDataPush() {
            const count = arguments.length;
            this._sync([ "_insertElements", this.getDataset().data.length - count, count ]);
        }
        _onDataPop() {
            this._sync([ "_removeElements", this._cachedMeta.data.length - 1, 1 ]);
        }
        _onDataShift() {
            this._sync([ "_removeElements", 0, 1 ]);
        }
        _onDataSplice(start, count) {
            if (count) this._sync([ "_removeElements", start, count ]);
            const newCount = arguments.length - 2;
            if (newCount) this._sync([ "_insertElements", start, newCount ]);
        }
        _onDataUnshift() {
            this._sync([ "_insertElements", 0, arguments.length ]);
        }
    }
    function getAllScaleValues(scale, type) {
        if (!scale._cache.$bar) {
            const visibleMetas = scale.getMatchingVisibleMetas(type);
            let values = [];
            for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
            scale._cache.$bar = _arrayUnique(values.sort(((a, b) => a - b)));
        }
        return scale._cache.$bar;
    }
    function computeMinSampleSize(meta) {
        const scale = meta.iScale;
        const values = getAllScaleValues(scale, meta.type);
        let min = scale._length;
        let i, ilen, curr, prev;
        const updateMinAndPrev = () => {
            if (curr === 32767 || curr === -32768) return;
            if (defined(prev)) min = Math.min(min, Math.abs(curr - prev) || min);
            prev = curr;
        };
        for (i = 0, ilen = values.length; i < ilen; ++i) {
            curr = scale.getPixelForValue(values[i]);
            updateMinAndPrev();
        }
        prev = void 0;
        for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
            curr = scale.getPixelForTick(i);
            updateMinAndPrev();
        }
        return min;
    }
    function computeFitCategoryTraits(index, ruler, options, stackCount) {
        const thickness = options.barThickness;
        let size, ratio;
        if (isNullOrUndef(thickness)) {
            size = ruler.min * options.categoryPercentage;
            ratio = options.barPercentage;
        } else {
            size = thickness * stackCount;
            ratio = 1;
        }
        return {
            chunk: size / stackCount,
            ratio,
            start: ruler.pixels[index] - size / 2
        };
    }
    function computeFlexCategoryTraits(index, ruler, options, stackCount) {
        const pixels = ruler.pixels;
        const curr = pixels[index];
        let prev = index > 0 ? pixels[index - 1] : null;
        let next = index < pixels.length - 1 ? pixels[index + 1] : null;
        const percent = options.categoryPercentage;
        if (prev === null) prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
        if (next === null) next = curr + curr - prev;
        const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
        const size = Math.abs(next - prev) / 2 * percent;
        return {
            chunk: size / stackCount,
            ratio: options.barPercentage,
            start
        };
    }
    function parseFloatBar(entry, item, vScale, i) {
        const startValue = vScale.parse(entry[0], i);
        const endValue = vScale.parse(entry[1], i);
        const min = Math.min(startValue, endValue);
        const max = Math.max(startValue, endValue);
        let barStart = min;
        let barEnd = max;
        if (Math.abs(min) > Math.abs(max)) {
            barStart = max;
            barEnd = min;
        }
        item[vScale.axis] = barEnd;
        item._custom = {
            barStart,
            barEnd,
            start: startValue,
            end: endValue,
            min,
            max
        };
    }
    function parseValue(entry, item, vScale, i) {
        if (isArray(entry)) parseFloatBar(entry, item, vScale, i); else item[vScale.axis] = vScale.parse(entry, i);
        return item;
    }
    function parseArrayOrPrimitive(meta, data, start, count) {
        const iScale = meta.iScale;
        const vScale = meta.vScale;
        const labels = iScale.getLabels();
        const singleScale = iScale === vScale;
        const parsed = [];
        let i, ilen, item, entry;
        for (i = start, ilen = start + count; i < ilen; ++i) {
            entry = data[i];
            item = {};
            item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
            parsed.push(parseValue(entry, item, vScale, i));
        }
        return parsed;
    }
    function isFloatBar(custom) {
        return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
    }
    function barSign(size, vScale, actualBase) {
        if (size !== 0) return sign(size);
        return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
    }
    function borderProps(properties) {
        let reverse, start, end, top, bottom;
        if (properties.horizontal) {
            reverse = properties.base > properties.x;
            start = "left";
            end = "right";
        } else {
            reverse = properties.base < properties.y;
            start = "bottom";
            end = "top";
        }
        if (reverse) {
            top = "end";
            bottom = "start";
        } else {
            top = "start";
            bottom = "end";
        }
        return {
            start,
            end,
            reverse,
            top,
            bottom
        };
    }
    function setBorderSkipped(properties, options, stack, index) {
        let edge = options.borderSkipped;
        const res = {};
        if (!edge) {
            properties.borderSkipped = res;
            return;
        }
        if (edge === true) {
            properties.borderSkipped = {
                top: true,
                right: true,
                bottom: true,
                left: true
            };
            return;
        }
        const {start, end, reverse, top, bottom} = borderProps(properties);
        if (edge === "middle" && stack) {
            properties.enableBorderRadius = true;
            if ((stack._top || 0) === index) edge = top; else if ((stack._bottom || 0) === index) edge = bottom; else {
                res[parseEdge(bottom, start, end, reverse)] = true;
                edge = top;
            }
        }
        res[parseEdge(edge, start, end, reverse)] = true;
        properties.borderSkipped = res;
    }
    function parseEdge(edge, a, b, reverse) {
        if (reverse) {
            edge = swap(edge, a, b);
            edge = startEnd(edge, b, a);
        } else edge = startEnd(edge, a, b);
        return edge;
    }
    function swap(orig, v1, v2) {
        return orig === v1 ? v2 : orig === v2 ? v1 : orig;
    }
    function startEnd(v, start, end) {
        return v === "start" ? start : v === "end" ? end : v;
    }
    function setInflateAmount(properties, {inflateAmount}, ratio) {
        properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? .33 : 0 : inflateAmount;
    }
    class BarController extends DatasetController {
        static id="bar";
        static defaults={
            datasetElementType: false,
            dataElementType: "bar",
            categoryPercentage: .8,
            barPercentage: .9,
            grouped: true,
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "base", "width", "height" ]
                }
            }
        };
        static overrides={
            scales: {
                _index_: {
                    type: "category",
                    offset: true,
                    grid: {
                        offset: true
                    }
                },
                _value_: {
                    type: "linear",
                    beginAtZero: true
                }
            }
        };
        parsePrimitiveData(meta, data, start, count) {
            return parseArrayOrPrimitive(meta, data, start, count);
        }
        parseArrayData(meta, data, start, count) {
            return parseArrayOrPrimitive(meta, data, start, count);
        }
        parseObjectData(meta, data, start, count) {
            const {iScale, vScale} = meta;
            const {xAxisKey = "x", yAxisKey = "y"} = this._parsing;
            const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
            const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
            const parsed = [];
            let i, ilen, item, obj;
            for (i = start, ilen = start + count; i < ilen; ++i) {
                obj = data[i];
                item = {};
                item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
                parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
            }
            return parsed;
        }
        updateRangeFromParsed(range, scale, parsed, stack) {
            super.updateRangeFromParsed(range, scale, parsed, stack);
            const custom = parsed._custom;
            if (custom && scale === this._cachedMeta.vScale) {
                range.min = Math.min(range.min, custom.min);
                range.max = Math.max(range.max, custom.max);
            }
        }
        getMaxOverflow() {
            return 0;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const {iScale, vScale} = meta;
            const parsed = this.getParsed(index);
            const custom = parsed._custom;
            const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
            return {
                label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
                value
            };
        }
        initialize() {
            this.enableOptionSharing = true;
            super.initialize();
            const meta = this._cachedMeta;
            meta.stack = this.getDataset().stack;
        }
        update(mode) {
            const meta = this._cachedMeta;
            this.updateElements(meta.data, 0, meta.data.length, mode);
        }
        updateElements(bars, start, count, mode) {
            const reset = mode === "reset";
            const {index, _cachedMeta: {vScale}} = this;
            const base = vScale.getBasePixel();
            const horizontal = vScale.isHorizontal();
            const ruler = this._getRuler();
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            for (let i = start; i < start + count; i++) {
                const parsed = this.getParsed(i);
                const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
                    base,
                    head: base
                } : this._calculateBarValuePixels(i);
                const ipixels = this._calculateBarIndexPixels(i, ruler);
                const stack = (parsed._stacks || {})[vScale.axis];
                const properties = {
                    horizontal,
                    base: vpixels.base,
                    enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
                    x: horizontal ? vpixels.head : ipixels.center,
                    y: horizontal ? ipixels.center : vpixels.head,
                    height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                    width: horizontal ? Math.abs(vpixels.size) : ipixels.size
                };
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? "active" : mode);
                const options = properties.options || bars[i].options;
                setBorderSkipped(properties, options, stack, index);
                setInflateAmount(properties, options, ruler.ratio);
                this.updateElement(bars[i], i, properties, mode);
            }
        }
        _getStacks(last, dataIndex) {
            const {iScale} = this._cachedMeta;
            const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta => meta.controller.options.grouped));
            const stacked = iScale.options.stacked;
            const stacks = [];
            const currentParsed = this._cachedMeta.controller.getParsed(dataIndex);
            const iScaleValue = currentParsed && currentParsed[iScale.axis];
            const skipNull = meta => {
                const parsed = meta._parsed.find((item => item[iScale.axis] === iScaleValue));
                const val = parsed && parsed[meta.vScale.axis];
                if (isNullOrUndef(val) || isNaN(val)) return true;
            };
            for (const meta of metasets) {
                if (dataIndex !== void 0 && skipNull(meta)) continue;
                if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) stacks.push(meta.stack);
                if (meta.index === last) break;
            }
            if (!stacks.length) stacks.push(void 0);
            return stacks;
        }
        _getStackCount(index) {
            return this._getStacks(void 0, index).length;
        }
        _getStackIndex(datasetIndex, name, dataIndex) {
            const stacks = this._getStacks(datasetIndex, dataIndex);
            const index = name !== void 0 ? stacks.indexOf(name) : -1;
            return index === -1 ? stacks.length - 1 : index;
        }
        _getRuler() {
            const opts = this.options;
            const meta = this._cachedMeta;
            const iScale = meta.iScale;
            const pixels = [];
            let i, ilen;
            for (i = 0, ilen = meta.data.length; i < ilen; ++i) pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
            const barThickness = opts.barThickness;
            const min = barThickness || computeMinSampleSize(meta);
            return {
                min,
                pixels,
                start: iScale._startPixel,
                end: iScale._endPixel,
                stackCount: this._getStackCount(),
                scale: iScale,
                grouped: opts.grouped,
                ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
            };
        }
        _calculateBarValuePixels(index) {
            const {_cachedMeta: {vScale, _stacked, index: datasetIndex}, options: {base: baseValue, minBarLength}} = this;
            const actualBase = baseValue || 0;
            const parsed = this.getParsed(index);
            const custom = parsed._custom;
            const floating = isFloatBar(custom);
            let value = parsed[vScale.axis];
            let start = 0;
            let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
            let head, size;
            if (length !== value) {
                start = length - value;
                length = value;
            }
            if (floating) {
                value = custom.barStart;
                length = custom.barEnd - custom.barStart;
                if (value !== 0 && sign(value) !== sign(custom.barEnd)) start = 0;
                start += value;
            }
            const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
            let base = vScale.getPixelForValue(startValue);
            if (this.chart.getDataVisibility(index)) head = vScale.getPixelForValue(start + length); else head = base;
            size = head - base;
            if (Math.abs(size) < minBarLength) {
                size = barSign(size, vScale, actualBase) * minBarLength;
                if (value === actualBase) base -= size / 2;
                const startPixel = vScale.getPixelForDecimal(0);
                const endPixel = vScale.getPixelForDecimal(1);
                const min = Math.min(startPixel, endPixel);
                const max = Math.max(startPixel, endPixel);
                base = Math.max(Math.min(base, max), min);
                head = base + size;
                if (_stacked && !floating) parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
            }
            if (base === vScale.getPixelForValue(actualBase)) {
                const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
                base += halfGrid;
                size -= halfGrid;
            }
            return {
                size,
                base,
                head,
                center: head + size / 2
            };
        }
        _calculateBarIndexPixels(index, ruler) {
            const scale = ruler.scale;
            const options = this.options;
            const skipNull = options.skipNull;
            const maxBarThickness = valueOrDefault(options.maxBarThickness, 1 / 0);
            let center, size;
            if (ruler.grouped) {
                const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
                const range = options.barThickness === "flex" ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);
                const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : void 0);
                center = range.start + range.chunk * stackIndex + range.chunk / 2;
                size = Math.min(maxBarThickness, range.chunk * range.ratio);
            } else {
                center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
                size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
            }
            return {
                base: center - size / 2,
                head: center + size / 2,
                center,
                size
            };
        }
        draw() {
            const meta = this._cachedMeta;
            const vScale = meta.vScale;
            const rects = meta.data;
            const ilen = rects.length;
            let i = 0;
            for (;i < ilen; ++i) if (this.getParsed(i)[vScale.axis] !== null && !rects[i].hidden) rects[i].draw(this._ctx);
        }
    }
    class BubbleController extends DatasetController {
        static id="bubble";
        static defaults={
            datasetElementType: false,
            dataElementType: "point",
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "borderWidth", "radius" ]
                }
            }
        };
        static overrides={
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        initialize() {
            this.enableOptionSharing = true;
            super.initialize();
        }
        parsePrimitiveData(meta, data, start, count) {
            const parsed = super.parsePrimitiveData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
            return parsed;
        }
        parseArrayData(meta, data, start, count) {
            const parsed = super.parseArrayData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
                const item = data[start + i];
                parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
            }
            return parsed;
        }
        parseObjectData(meta, data, start, count) {
            const parsed = super.parseObjectData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
                const item = data[start + i];
                parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
            }
            return parsed;
        }
        getMaxOverflow() {
            const data = this._cachedMeta.data;
            let max = 0;
            for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
            return max > 0 && max;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const labels = this.chart.data.labels || [];
            const {xScale, yScale} = meta;
            const parsed = this.getParsed(index);
            const x = xScale.getLabelForValue(parsed.x);
            const y = yScale.getLabelForValue(parsed.y);
            const r = parsed._custom;
            return {
                label: labels[index] || "",
                value: "(" + x + ", " + y + (r ? ", " + r : "") + ")"
            };
        }
        update(mode) {
            const points = this._cachedMeta.data;
            this.updateElements(points, 0, points.length, mode);
        }
        updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const {iScale, vScale} = this._cachedMeta;
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            for (let i = start; i < start + count; i++) {
                const point = points[i];
                const parsed = !reset && this.getParsed(i);
                const properties = {};
                const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(.5) : iScale.getPixelForValue(parsed[iAxis]);
                const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
                properties.skip = isNaN(iPixel) || isNaN(vPixel);
                if (includeOptions) {
                    properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                    if (reset) properties.options.radius = 0;
                }
                this.updateElement(point, i, properties, mode);
            }
        }
        resolveDataElementOptions(index, mode) {
            const parsed = this.getParsed(index);
            let values = super.resolveDataElementOptions(index, mode);
            if (values.$shared) values = Object.assign({}, values, {
                $shared: false
            });
            const radius = values.radius;
            if (mode !== "active") values.radius = 0;
            values.radius += valueOrDefault(parsed && parsed._custom, radius);
            return values;
        }
    }
    function getRatioAndOffset(rotation, circumference, cutout) {
        let ratioX = 1;
        let ratioY = 1;
        let offsetX = 0;
        let offsetY = 0;
        if (circumference < TAU) {
            const startAngle = rotation;
            const endAngle = startAngle + circumference;
            const startX = Math.cos(startAngle);
            const startY = Math.sin(startAngle);
            const endX = Math.cos(endAngle);
            const endY = Math.sin(endAngle);
            const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
            const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
            const maxX = calcMax(0, startX, endX);
            const maxY = calcMax(HALF_PI, startY, endY);
            const minX = calcMin(PI, startX, endX);
            const minY = calcMin(PI + HALF_PI, startY, endY);
            ratioX = (maxX - minX) / 2;
            ratioY = (maxY - minY) / 2;
            offsetX = -(maxX + minX) / 2;
            offsetY = -(maxY + minY) / 2;
        }
        return {
            ratioX,
            ratioY,
            offsetX,
            offsetY
        };
    }
    class DoughnutController extends DatasetController {
        static id="doughnut";
        static defaults={
            datasetElementType: false,
            dataElementType: "arc",
            animation: {
                animateRotate: true,
                animateScale: false
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing" ]
                }
            },
            cutout: "50%",
            rotation: 0,
            circumference: 360,
            radius: "100%",
            spacing: 0,
            indexAxis: "r"
        };
        static descriptors={
            _scriptable: name => name !== "spacing",
            _indexable: name => name !== "spacing" && !name.startsWith("borderDash") && !name.startsWith("hoverBorderDash")
        };
        static overrides={
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                const {labels: {pointStyle, color}} = chart.legend.options;
                                return data.labels.map(((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    return {
                                        text: label,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        fontColor: color,
                                        lineWidth: style.borderWidth,
                                        pointStyle,
                                        hidden: !chart.getDataVisibility(i),
                                        index: i
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                    }
                }
            }
        };
        constructor(chart, datasetIndex) {
            super(chart, datasetIndex);
            this.enableOptionSharing = true;
            this.innerRadius = void 0;
            this.outerRadius = void 0;
            this.offsetX = void 0;
            this.offsetY = void 0;
        }
        linkScales() {}
        parse(start, count) {
            const data = this.getDataset().data;
            const meta = this._cachedMeta;
            if (this._parsing === false) meta._parsed = data; else {
                let getter = i => +data[i];
                if (helpers_segment_isObject(data[start])) {
                    const {key = "value"} = this._parsing;
                    getter = i => +resolveObjectKey(data[i], key);
                }
                let i, ilen;
                for (i = start, ilen = start + count; i < ilen; ++i) meta._parsed[i] = getter(i);
            }
        }
        _getRotation() {
            return toRadians(this.options.rotation - 90);
        }
        _getCircumference() {
            return toRadians(this.options.circumference);
        }
        _getRotationExtents() {
            let min = TAU;
            let max = -TAU;
            for (let i = 0; i < this.chart.data.datasets.length; ++i) if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
                const controller = this.chart.getDatasetMeta(i).controller;
                const rotation = controller._getRotation();
                const circumference = controller._getCircumference();
                min = Math.min(min, rotation);
                max = Math.max(max, rotation + circumference);
            }
            return {
                rotation: min,
                circumference: max - min
            };
        }
        update(mode) {
            const chart = this.chart;
            const {chartArea} = chart;
            const meta = this._cachedMeta;
            const arcs = meta.data;
            const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
            const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
            const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
            const chartWeight = this._getRingWeight(this.index);
            const {circumference, rotation} = this._getRotationExtents();
            const {ratioX, ratioY, offsetX, offsetY} = getRatioAndOffset(rotation, circumference, cutout);
            const maxWidth = (chartArea.width - spacing) / ratioX;
            const maxHeight = (chartArea.height - spacing) / ratioY;
            const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
            const outerRadius = toDimension(this.options.radius, maxRadius);
            const innerRadius = Math.max(outerRadius * cutout, 0);
            const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
            this.offsetX = offsetX * outerRadius;
            this.offsetY = offsetY * outerRadius;
            meta.total = this.calculateTotal();
            this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
            this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
            this.updateElements(arcs, 0, arcs.length, mode);
        }
        _circumference(i, reset) {
            const opts = this.options;
            const meta = this._cachedMeta;
            const circumference = this._getCircumference();
            if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) return 0;
            return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
        }
        updateElements(arcs, start, count, mode) {
            const reset = mode === "reset";
            const chart = this.chart;
            const chartArea = chart.chartArea;
            const opts = chart.options;
            const animationOpts = opts.animation;
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
            const animateScale = reset && animationOpts.animateScale;
            const innerRadius = animateScale ? 0 : this.innerRadius;
            const outerRadius = animateScale ? 0 : this.outerRadius;
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            let startAngle = this._getRotation();
            let i;
            for (i = 0; i < start; ++i) startAngle += this._circumference(i, reset);
            for (i = start; i < start + count; ++i) {
                const circumference = this._circumference(i, reset);
                const arc = arcs[i];
                const properties = {
                    x: centerX + this.offsetX,
                    y: centerY + this.offsetY,
                    startAngle,
                    endAngle: startAngle + circumference,
                    circumference,
                    outerRadius,
                    innerRadius
                };
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? "active" : mode);
                startAngle += circumference;
                this.updateElement(arc, i, properties, mode);
            }
        }
        calculateTotal() {
            const meta = this._cachedMeta;
            const metaData = meta.data;
            let total = 0;
            let i;
            for (i = 0; i < metaData.length; i++) {
                const value = meta._parsed[i];
                if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) total += Math.abs(value);
            }
            return total;
        }
        calculateCircumference(value) {
            const total = this._cachedMeta.total;
            if (total > 0 && !isNaN(value)) return TAU * (Math.abs(value) / total);
            return 0;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const chart = this.chart;
            const labels = chart.data.labels || [];
            const value = formatNumber(meta._parsed[index], chart.options.locale);
            return {
                label: labels[index] || "",
                value
            };
        }
        getMaxBorderWidth(arcs) {
            let max = 0;
            const chart = this.chart;
            let i, ilen, meta, controller, options;
            if (!arcs) for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) if (chart.isDatasetVisible(i)) {
                meta = chart.getDatasetMeta(i);
                arcs = meta.data;
                controller = meta.controller;
                break;
            }
            if (!arcs) return 0;
            for (i = 0, ilen = arcs.length; i < ilen; ++i) {
                options = controller.resolveDataElementOptions(i);
                if (options.borderAlign !== "inner") max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
            }
            return max;
        }
        getMaxOffset(arcs) {
            let max = 0;
            for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
                const options = this.resolveDataElementOptions(i);
                max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
            }
            return max;
        }
        _getRingWeightOffset(datasetIndex) {
            let ringWeightOffset = 0;
            for (let i = 0; i < datasetIndex; ++i) if (this.chart.isDatasetVisible(i)) ringWeightOffset += this._getRingWeight(i);
            return ringWeightOffset;
        }
        _getRingWeight(datasetIndex) {
            return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
        }
        _getVisibleDatasetWeightTotal() {
            return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
        }
    }
    class LineController extends DatasetController {
        static id="line";
        static defaults={
            datasetElementType: "line",
            dataElementType: "point",
            showLine: true,
            spanGaps: false
        };
        static overrides={
            scales: {
                _index_: {
                    type: "category"
                },
                _value_: {
                    type: "linear"
                }
            }
        };
        initialize() {
            this.enableOptionSharing = true;
            this.supportsDecimation = true;
            super.initialize();
        }
        update(mode) {
            const meta = this._cachedMeta;
            const {dataset: line, data: points = [], _dataset} = meta;
            const animationsDisabled = this.chart._animationsDisabled;
            let {start, count} = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
            this._drawStart = start;
            this._drawCount = count;
            if (_scaleRangesChanged(meta)) {
                start = 0;
                count = points.length;
            }
            line._chart = this.chart;
            line._datasetIndex = this.index;
            line._decimated = !!_dataset._decimated;
            line.points = points;
            const options = this.resolveDatasetElementOptions(mode);
            if (!this.options.showLine) options.borderWidth = 0;
            options.segment = this.options.segment;
            this.updateElement(line, void 0, {
                animated: !animationsDisabled,
                options
            }, mode);
            this.updateElements(points, start, count, mode);
        }
        updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const {iScale, vScale, _stacked, _dataset} = this._cachedMeta;
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const {spanGaps, segment} = this.options;
            const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
            const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
            const end = start + count;
            const pointsCount = points.length;
            let prevParsed = start > 0 && this.getParsed(start - 1);
            for (let i = 0; i < pointsCount; ++i) {
                const point = points[i];
                const properties = directUpdate ? point : {};
                if (i < start || i >= end) {
                    properties.skip = true;
                    continue;
                }
                const parsed = this.getParsed(i);
                const nullData = isNullOrUndef(parsed[vAxis]);
                const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
                const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
                properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
                properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
                if (segment) {
                    properties.parsed = parsed;
                    properties.raw = _dataset.data[i];
                }
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                if (!directUpdate) this.updateElement(point, i, properties, mode);
                prevParsed = parsed;
            }
        }
        getMaxOverflow() {
            const meta = this._cachedMeta;
            const dataset = meta.dataset;
            const border = dataset.options && dataset.options.borderWidth || 0;
            const data = meta.data || [];
            if (!data.length) return border;
            const firstPoint = data[0].size(this.resolveDataElementOptions(0));
            const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
            return Math.max(border, firstPoint, lastPoint) / 2;
        }
        draw() {
            const meta = this._cachedMeta;
            meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
            super.draw();
        }
    }
    class PolarAreaController extends DatasetController {
        static id="polarArea";
        static defaults={
            dataElementType: "arc",
            animation: {
                animateRotate: true,
                animateScale: true
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius" ]
                }
            },
            indexAxis: "r",
            startAngle: 0
        };
        static overrides={
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                const {labels: {pointStyle, color}} = chart.legend.options;
                                return data.labels.map(((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    return {
                                        text: label,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        fontColor: color,
                                        lineWidth: style.borderWidth,
                                        pointStyle,
                                        hidden: !chart.getDataVisibility(i),
                                        index: i
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                    }
                }
            },
            scales: {
                r: {
                    type: "radialLinear",
                    angleLines: {
                        display: false
                    },
                    beginAtZero: true,
                    grid: {
                        circular: true
                    },
                    pointLabels: {
                        display: false
                    },
                    startAngle: 0
                }
            }
        };
        constructor(chart, datasetIndex) {
            super(chart, datasetIndex);
            this.innerRadius = void 0;
            this.outerRadius = void 0;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const chart = this.chart;
            const labels = chart.data.labels || [];
            const value = formatNumber(meta._parsed[index].r, chart.options.locale);
            return {
                label: labels[index] || "",
                value
            };
        }
        parseObjectData(meta, data, start, count) {
            return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
        }
        update(mode) {
            const arcs = this._cachedMeta.data;
            this._updateRadius();
            this.updateElements(arcs, 0, arcs.length, mode);
        }
        getMinMax() {
            const meta = this._cachedMeta;
            const range = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
            meta.data.forEach(((element, index) => {
                const parsed = this.getParsed(index).r;
                if (!isNaN(parsed) && this.chart.getDataVisibility(index)) {
                    if (parsed < range.min) range.min = parsed;
                    if (parsed > range.max) range.max = parsed;
                }
            }));
            return range;
        }
        _updateRadius() {
            const chart = this.chart;
            const chartArea = chart.chartArea;
            const opts = chart.options;
            const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            const outerRadius = Math.max(minSize / 2, 0);
            const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
            const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
            this.outerRadius = outerRadius - radiusLength * this.index;
            this.innerRadius = this.outerRadius - radiusLength;
        }
        updateElements(arcs, start, count, mode) {
            const reset = mode === "reset";
            const chart = this.chart;
            const opts = chart.options;
            const animationOpts = opts.animation;
            const scale = this._cachedMeta.rScale;
            const centerX = scale.xCenter;
            const centerY = scale.yCenter;
            const datasetStartAngle = scale.getIndexAngle(0) - .5 * PI;
            let angle = datasetStartAngle;
            let i;
            const defaultAngle = 360 / this.countVisibleElements();
            for (i = 0; i < start; ++i) angle += this._computeAngle(i, mode, defaultAngle);
            for (i = start; i < start + count; i++) {
                const arc = arcs[i];
                let startAngle = angle;
                let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
                let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
                angle = endAngle;
                if (reset) {
                    if (animationOpts.animateScale) outerRadius = 0;
                    if (animationOpts.animateRotate) startAngle = endAngle = datasetStartAngle;
                }
                const properties = {
                    x: centerX,
                    y: centerY,
                    innerRadius: 0,
                    outerRadius,
                    startAngle,
                    endAngle,
                    options: this.resolveDataElementOptions(i, arc.active ? "active" : mode)
                };
                this.updateElement(arc, i, properties, mode);
            }
        }
        countVisibleElements() {
            const meta = this._cachedMeta;
            let count = 0;
            meta.data.forEach(((element, index) => {
                if (!isNaN(this.getParsed(index).r) && this.chart.getDataVisibility(index)) count++;
            }));
            return count;
        }
        _computeAngle(index, mode, defaultAngle) {
            return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
        }
    }
    class PieController extends DoughnutController {
        static id="pie";
        static defaults={
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: "100%"
        };
    }
    class RadarController extends DatasetController {
        static id="radar";
        static defaults={
            datasetElementType: "line",
            dataElementType: "point",
            indexAxis: "r",
            showLine: true,
            elements: {
                line: {
                    fill: "start"
                }
            }
        };
        static overrides={
            aspectRatio: 1,
            scales: {
                r: {
                    type: "radialLinear"
                }
            }
        };
        getLabelAndValue(index) {
            const vScale = this._cachedMeta.vScale;
            const parsed = this.getParsed(index);
            return {
                label: vScale.getLabels()[index],
                value: "" + vScale.getLabelForValue(parsed[vScale.axis])
            };
        }
        parseObjectData(meta, data, start, count) {
            return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
        }
        update(mode) {
            const meta = this._cachedMeta;
            const line = meta.dataset;
            const points = meta.data || [];
            const labels = meta.iScale.getLabels();
            line.points = points;
            if (mode !== "resize") {
                const options = this.resolveDatasetElementOptions(mode);
                if (!this.options.showLine) options.borderWidth = 0;
                const properties = {
                    _loop: true,
                    _fullLoop: labels.length === points.length,
                    options
                };
                this.updateElement(line, void 0, properties, mode);
            }
            this.updateElements(points, 0, points.length, mode);
        }
        updateElements(points, start, count, mode) {
            const scale = this._cachedMeta.rScale;
            const reset = mode === "reset";
            for (let i = start; i < start + count; i++) {
                const point = points[i];
                const options = this.resolveDataElementOptions(i, point.active ? "active" : mode);
                const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
                const x = reset ? scale.xCenter : pointPosition.x;
                const y = reset ? scale.yCenter : pointPosition.y;
                const properties = {
                    x,
                    y,
                    angle: pointPosition.angle,
                    skip: isNaN(x) || isNaN(y),
                    options
                };
                this.updateElement(point, i, properties, mode);
            }
        }
    }
    class ScatterController extends DatasetController {
        static id="scatter";
        static defaults={
            datasetElementType: false,
            dataElementType: "point",
            showLine: false,
            fill: false
        };
        static overrides={
            interaction: {
                mode: "point"
            },
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const labels = this.chart.data.labels || [];
            const {xScale, yScale} = meta;
            const parsed = this.getParsed(index);
            const x = xScale.getLabelForValue(parsed.x);
            const y = yScale.getLabelForValue(parsed.y);
            return {
                label: labels[index] || "",
                value: "(" + x + ", " + y + ")"
            };
        }
        update(mode) {
            const meta = this._cachedMeta;
            const {data: points = []} = meta;
            const animationsDisabled = this.chart._animationsDisabled;
            let {start, count} = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
            this._drawStart = start;
            this._drawCount = count;
            if (_scaleRangesChanged(meta)) {
                start = 0;
                count = points.length;
            }
            if (this.options.showLine) {
                if (!this.datasetElementType) this.addElements();
                const {dataset: line, _dataset} = meta;
                line._chart = this.chart;
                line._datasetIndex = this.index;
                line._decimated = !!_dataset._decimated;
                line.points = points;
                const options = this.resolveDatasetElementOptions(mode);
                options.segment = this.options.segment;
                this.updateElement(line, void 0, {
                    animated: !animationsDisabled,
                    options
                }, mode);
            } else if (this.datasetElementType) {
                delete meta.dataset;
                this.datasetElementType = false;
            }
            this.updateElements(points, start, count, mode);
        }
        addElements() {
            const {showLine} = this.options;
            if (!this.datasetElementType && showLine) this.datasetElementType = this.chart.registry.getElement("line");
            super.addElements();
        }
        updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const {iScale, vScale, _stacked, _dataset} = this._cachedMeta;
            const firstOpts = this.resolveDataElementOptions(start, mode);
            const sharedOptions = this.getSharedOptions(firstOpts);
            const includeOptions = this.includeOptions(mode, sharedOptions);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const {spanGaps, segment} = this.options;
            const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
            const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
            let prevParsed = start > 0 && this.getParsed(start - 1);
            for (let i = start; i < start + count; ++i) {
                const point = points[i];
                const parsed = this.getParsed(i);
                const properties = directUpdate ? point : {};
                const nullData = isNullOrUndef(parsed[vAxis]);
                const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
                const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
                properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
                properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
                if (segment) {
                    properties.parsed = parsed;
                    properties.raw = _dataset.data[i];
                }
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                if (!directUpdate) this.updateElement(point, i, properties, mode);
                prevParsed = parsed;
            }
            this.updateSharedOptions(sharedOptions, mode, firstOpts);
        }
        getMaxOverflow() {
            const meta = this._cachedMeta;
            const data = meta.data || [];
            if (!this.options.showLine) {
                let max = 0;
                for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
                return max > 0 && max;
            }
            const dataset = meta.dataset;
            const border = dataset.options && dataset.options.borderWidth || 0;
            if (!data.length) return border;
            const firstPoint = data[0].size(this.resolveDataElementOptions(0));
            const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
            return Math.max(border, firstPoint, lastPoint) / 2;
        }
    }
    var controllers = Object.freeze({
        __proto__: null,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController
    });
    function chart_abstract() {
        throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
    }
    class DateAdapterBase {
        static override(members) {
            Object.assign(DateAdapterBase.prototype, members);
        }
        options;
        constructor(options) {
            this.options = options || {};
        }
        init() {}
        formats() {
            return chart_abstract();
        }
        parse() {
            return chart_abstract();
        }
        format() {
            return chart_abstract();
        }
        add() {
            return chart_abstract();
        }
        diff() {
            return chart_abstract();
        }
        startOf() {
            return chart_abstract();
        }
        endOf() {
            return chart_abstract();
        }
    }
    var adapters = {
        _date: DateAdapterBase
    };
    function binarySearch(metaset, axis, value, intersect) {
        const {controller, data, _sorted} = metaset;
        const iScale = controller._cachedMeta.iScale;
        if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
            const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
            if (!intersect) return lookupMethod(data, axis, value); else if (controller._sharedOptions) {
                const el = data[0];
                const range = typeof el.getRange === "function" && el.getRange(axis);
                if (range) {
                    const start = lookupMethod(data, axis, value - range);
                    const end = lookupMethod(data, axis, value + range);
                    return {
                        lo: start.lo,
                        hi: end.hi
                    };
                }
            }
        }
        return {
            lo: 0,
            hi: data.length - 1
        };
    }
    function evaluateInteractionItems(chart, axis, position, handler, intersect) {
        const metasets = chart.getSortedVisibleDatasetMetas();
        const value = position[axis];
        for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
            const {index, data} = metasets[i];
            const {lo, hi} = binarySearch(metasets[i], axis, value, intersect);
            for (let j = lo; j <= hi; ++j) {
                const element = data[j];
                if (!element.skip) handler(element, index, j);
            }
        }
    }
    function getDistanceMetricForAxis(axis) {
        const useX = axis.indexOf("x") !== -1;
        const useY = axis.indexOf("y") !== -1;
        return function(pt1, pt2) {
            const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
            const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
            return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        };
    }
    function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
        const items = [];
        if (!includeInvisible && !chart.isPointInArea(position)) return items;
        const evaluationFunc = function(element, datasetIndex, index) {
            if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) return;
            if (element.inRange(position.x, position.y, useFinalPosition)) items.push({
                element,
                datasetIndex,
                index
            });
        };
        evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
        return items;
    }
    function getNearestRadialItems(chart, position, axis, useFinalPosition) {
        let items = [];
        function evaluationFunc(element, datasetIndex, index) {
            const {startAngle, endAngle} = element.getProps([ "startAngle", "endAngle" ], useFinalPosition);
            const {angle} = getAngleFromPoint(element, {
                x: position.x,
                y: position.y
            });
            if (_angleBetween(angle, startAngle, endAngle)) items.push({
                element,
                datasetIndex,
                index
            });
        }
        evaluateInteractionItems(chart, axis, position, evaluationFunc);
        return items;
    }
    function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
        let items = [];
        const distanceMetric = getDistanceMetricForAxis(axis);
        let minDistance = Number.POSITIVE_INFINITY;
        function evaluationFunc(element, datasetIndex, index) {
            const inRange = element.inRange(position.x, position.y, useFinalPosition);
            if (intersect && !inRange) return;
            const center = element.getCenterPoint(useFinalPosition);
            const pointInArea = !!includeInvisible || chart.isPointInArea(center);
            if (!pointInArea && !inRange) return;
            const distance = distanceMetric(position, center);
            if (distance < minDistance) {
                items = [ {
                    element,
                    datasetIndex,
                    index
                } ];
                minDistance = distance;
            } else if (distance === minDistance) items.push({
                element,
                datasetIndex,
                index
            });
        }
        evaluateInteractionItems(chart, axis, position, evaluationFunc);
        return items;
    }
    function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
        if (!includeInvisible && !chart.isPointInArea(position)) return [];
        return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
    }
    function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
        const items = [];
        const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
        let intersectsItem = false;
        evaluateInteractionItems(chart, axis, position, ((element, datasetIndex, index) => {
            if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
                items.push({
                    element,
                    datasetIndex,
                    index
                });
                intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
            }
        }));
        if (intersect && !intersectsItem) return [];
        return items;
    }
    var Interaction = {
        evaluateInteractionItems,
        modes: {
            index(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "x";
                const includeInvisible = options.includeInvisible || false;
                const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
                const elements = [];
                if (!items.length) return [];
                chart.getSortedVisibleDatasetMetas().forEach((meta => {
                    const index = items[0].index;
                    const element = meta.data[index];
                    if (element && !element.skip) elements.push({
                        element,
                        datasetIndex: meta.index,
                        index
                    });
                }));
                return elements;
            },
            dataset(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "xy";
                const includeInvisible = options.includeInvisible || false;
                let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
                if (items.length > 0) {
                    const datasetIndex = items[0].datasetIndex;
                    const data = chart.getDatasetMeta(datasetIndex).data;
                    items = [];
                    for (let i = 0; i < data.length; ++i) items.push({
                        element: data[i],
                        datasetIndex,
                        index: i
                    });
                }
                return items;
            },
            point(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "xy";
                const includeInvisible = options.includeInvisible || false;
                return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
            },
            nearest(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "xy";
                const includeInvisible = options.includeInvisible || false;
                return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
            },
            x(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                return getAxisItems(chart, position, "x", options.intersect, useFinalPosition);
            },
            y(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                return getAxisItems(chart, position, "y", options.intersect, useFinalPosition);
            }
        }
    };
    const STATIC_POSITIONS = [ "left", "top", "right", "bottom" ];
    function filterByPosition(array, position) {
        return array.filter((v => v.pos === position));
    }
    function filterDynamicPositionByAxis(array, axis) {
        return array.filter((v => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis));
    }
    function sortByWeight(array, reverse) {
        return array.sort(((a, b) => {
            const v0 = reverse ? b : a;
            const v1 = reverse ? a : b;
            return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
        }));
    }
    function wrapBoxes(boxes) {
        const layoutBoxes = [];
        let i, ilen, box, pos, stack, stackWeight;
        for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
            box = boxes[i];
            ({position: pos, options: {stack, stackWeight = 1}} = box);
            layoutBoxes.push({
                index: i,
                box,
                pos,
                horizontal: box.isHorizontal(),
                weight: box.weight,
                stack: stack && pos + stack,
                stackWeight
            });
        }
        return layoutBoxes;
    }
    function buildStacks(layouts) {
        const stacks = {};
        for (const wrap of layouts) {
            const {stack, pos, stackWeight} = wrap;
            if (!stack || !STATIC_POSITIONS.includes(pos)) continue;
            const _stack = stacks[stack] || (stacks[stack] = {
                count: 0,
                placed: 0,
                weight: 0,
                size: 0
            });
            _stack.count++;
            _stack.weight += stackWeight;
        }
        return stacks;
    }
    function setLayoutDims(layouts, params) {
        const stacks = buildStacks(layouts);
        const {vBoxMaxWidth, hBoxMaxHeight} = params;
        let i, ilen, layout;
        for (i = 0, ilen = layouts.length; i < ilen; ++i) {
            layout = layouts[i];
            const {fullSize} = layout.box;
            const stack = stacks[layout.stack];
            const factor = stack && layout.stackWeight / stack.weight;
            if (layout.horizontal) {
                layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
                layout.height = hBoxMaxHeight;
            } else {
                layout.width = vBoxMaxWidth;
                layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
            }
        }
        return stacks;
    }
    function buildLayoutBoxes(boxes) {
        const layoutBoxes = wrapBoxes(boxes);
        const fullSize = sortByWeight(layoutBoxes.filter((wrap => wrap.box.fullSize)), true);
        const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
        const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
        const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
        const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
        const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
        const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
        return {
            fullSize,
            leftAndTop: left.concat(top),
            rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
            chartArea: filterByPosition(layoutBoxes, "chartArea"),
            vertical: left.concat(right).concat(centerVertical),
            horizontal: top.concat(bottom).concat(centerHorizontal)
        };
    }
    function getCombinedMax(maxPadding, chartArea, a, b) {
        return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
    }
    function updateMaxPadding(maxPadding, boxPadding) {
        maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
        maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
        maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
        maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
    }
    function updateDims(chartArea, params, layout, stacks) {
        const {pos, box} = layout;
        const maxPadding = chartArea.maxPadding;
        if (!helpers_segment_isObject(pos)) {
            if (layout.size) chartArea[pos] -= layout.size;
            const stack = stacks[layout.stack] || {
                size: 0,
                count: 1
            };
            stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
            layout.size = stack.size / stack.count;
            chartArea[pos] += layout.size;
        }
        if (box.getPadding) updateMaxPadding(maxPadding, box.getPadding());
        const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
        const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
        const widthChanged = newWidth !== chartArea.w;
        const heightChanged = newHeight !== chartArea.h;
        chartArea.w = newWidth;
        chartArea.h = newHeight;
        return layout.horizontal ? {
            same: widthChanged,
            other: heightChanged
        } : {
            same: heightChanged,
            other: widthChanged
        };
    }
    function handleMaxPadding(chartArea) {
        const maxPadding = chartArea.maxPadding;
        function updatePos(pos) {
            const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
            chartArea[pos] += change;
            return change;
        }
        chartArea.y += updatePos("top");
        chartArea.x += updatePos("left");
        updatePos("right");
        updatePos("bottom");
    }
    function getMargins(horizontal, chartArea) {
        const maxPadding = chartArea.maxPadding;
        function marginForPositions(positions) {
            const margin = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            positions.forEach((pos => {
                margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
            }));
            return margin;
        }
        return horizontal ? marginForPositions([ "left", "right" ]) : marginForPositions([ "top", "bottom" ]);
    }
    function fitBoxes(boxes, chartArea, params, stacks) {
        const refitBoxes = [];
        let i, ilen, layout, box, refit, changed;
        for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
            layout = boxes[i];
            box = layout.box;
            box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
            const {same, other} = updateDims(chartArea, params, layout, stacks);
            refit |= same && refitBoxes.length;
            changed = changed || other;
            if (!box.fullSize) refitBoxes.push(layout);
        }
        return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
    }
    function setBoxDims(box, left, top, width, height) {
        box.top = top;
        box.left = left;
        box.right = left + width;
        box.bottom = top + height;
        box.width = width;
        box.height = height;
    }
    function placeBoxes(boxes, chartArea, params, stacks) {
        const userPadding = params.padding;
        let {x, y} = chartArea;
        for (const layout of boxes) {
            const box = layout.box;
            const stack = stacks[layout.stack] || {
                count: 1,
                placed: 0,
                weight: 1
            };
            const weight = layout.stackWeight / stack.weight || 1;
            if (layout.horizontal) {
                const width = chartArea.w * weight;
                const height = stack.size || box.height;
                if (defined(stack.start)) y = stack.start;
                if (box.fullSize) setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height); else setBoxDims(box, chartArea.left + stack.placed, y, width, height);
                stack.start = y;
                stack.placed += width;
                y = box.bottom;
            } else {
                const height = chartArea.h * weight;
                const width = stack.size || box.width;
                if (defined(stack.start)) x = stack.start;
                if (box.fullSize) setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top); else setBoxDims(box, x, chartArea.top + stack.placed, width, height);
                stack.start = x;
                stack.placed += height;
                x = box.right;
            }
        }
        chartArea.x = x;
        chartArea.y = y;
    }
    var layouts = {
        addBox(chart, item) {
            if (!chart.boxes) chart.boxes = [];
            item.fullSize = item.fullSize || false;
            item.position = item.position || "top";
            item.weight = item.weight || 0;
            item._layers = item._layers || function() {
                return [ {
                    z: 0,
                    draw(chartArea) {
                        item.draw(chartArea);
                    }
                } ];
            };
            chart.boxes.push(item);
        },
        removeBox(chart, layoutItem) {
            const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
            if (index !== -1) chart.boxes.splice(index, 1);
        },
        configure(chart, item, options) {
            item.fullSize = options.fullSize;
            item.position = options.position;
            item.weight = options.weight;
        },
        update(chart, width, height, minPadding) {
            if (!chart) return;
            const padding = toPadding(chart.options.layout.padding);
            const availableWidth = Math.max(width - padding.width, 0);
            const availableHeight = Math.max(height - padding.height, 0);
            const boxes = buildLayoutBoxes(chart.boxes);
            const verticalBoxes = boxes.vertical;
            const horizontalBoxes = boxes.horizontal;
            each(chart.boxes, (box => {
                if (typeof box.beforeLayout === "function") box.beforeLayout();
            }));
            const visibleVerticalBoxCount = verticalBoxes.reduce(((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1), 0) || 1;
            const params = Object.freeze({
                outerWidth: width,
                outerHeight: height,
                padding,
                availableWidth,
                availableHeight,
                vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
                hBoxMaxHeight: availableHeight / 2
            });
            const maxPadding = Object.assign({}, padding);
            updateMaxPadding(maxPadding, toPadding(minPadding));
            const chartArea = Object.assign({
                maxPadding,
                w: availableWidth,
                h: availableHeight,
                x: padding.left,
                y: padding.top
            }, padding);
            const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
            fitBoxes(boxes.fullSize, chartArea, params, stacks);
            fitBoxes(verticalBoxes, chartArea, params, stacks);
            if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) fitBoxes(verticalBoxes, chartArea, params, stacks);
            handleMaxPadding(chartArea);
            placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
            chartArea.x += chartArea.w;
            chartArea.y += chartArea.h;
            placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
            chart.chartArea = {
                left: chartArea.left,
                top: chartArea.top,
                right: chartArea.left + chartArea.w,
                bottom: chartArea.top + chartArea.h,
                height: chartArea.h,
                width: chartArea.w
            };
            each(boxes.chartArea, (layout => {
                const box = layout.box;
                Object.assign(box, chart.chartArea);
                box.update(chartArea.w, chartArea.h, {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                });
            }));
        }
    };
    class BasePlatform {
        acquireContext(canvas, aspectRatio) {}
        releaseContext(context) {
            return false;
        }
        addEventListener(chart, type, listener) {}
        removeEventListener(chart, type, listener) {}
        getDevicePixelRatio() {
            return 1;
        }
        getMaximumSize(element, width, height, aspectRatio) {
            width = Math.max(0, width || element.width);
            height = height || element.height;
            return {
                width,
                height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
            };
        }
        isAttached(canvas) {
            return true;
        }
        updateConfig(config) {}
    }
    class BasicPlatform extends BasePlatform {
        acquireContext(item) {
            return item && item.getContext && item.getContext("2d") || null;
        }
        updateConfig(config) {
            config.options.animation = false;
        }
    }
    const EXPANDO_KEY = "$chartjs";
    const EVENT_TYPES = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
    };
    const isNullOrEmpty = value => value === null || value === "";
    function initCanvas(canvas, aspectRatio) {
        const style = canvas.style;
        const renderHeight = canvas.getAttribute("height");
        const renderWidth = canvas.getAttribute("width");
        canvas[EXPANDO_KEY] = {
            initial: {
                height: renderHeight,
                width: renderWidth,
                style: {
                    display: style.display,
                    height: style.height,
                    width: style.width
                }
            }
        };
        style.display = style.display || "block";
        style.boxSizing = style.boxSizing || "border-box";
        if (isNullOrEmpty(renderWidth)) {
            const displayWidth = readUsedSize(canvas, "width");
            if (displayWidth !== void 0) canvas.width = displayWidth;
        }
        if (isNullOrEmpty(renderHeight)) if (canvas.style.height === "") canvas.height = canvas.width / (aspectRatio || 2); else {
            const displayHeight = readUsedSize(canvas, "height");
            if (displayHeight !== void 0) canvas.height = displayHeight;
        }
        return canvas;
    }
    const eventListenerOptions = supportsEventListenerOptions ? {
        passive: true
    } : false;
    function addListener(node, type, listener) {
        if (node) node.addEventListener(type, listener, eventListenerOptions);
    }
    function removeListener(chart, type, listener) {
        if (chart && chart.canvas) chart.canvas.removeEventListener(type, listener, eventListenerOptions);
    }
    function fromNativeEvent(event, chart) {
        const type = EVENT_TYPES[event.type] || event.type;
        const {x, y} = getRelativePosition(event, chart);
        return {
            type,
            chart,
            native: event,
            x: x !== void 0 ? x : null,
            y: y !== void 0 ? y : null
        };
    }
    function nodeListContains(nodeList, canvas) {
        for (const node of nodeList) if (node === canvas || node.contains(canvas)) return true;
    }
    function createAttachObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const observer = new MutationObserver((entries => {
            let trigger = false;
            for (const entry of entries) {
                trigger = trigger || nodeListContains(entry.addedNodes, canvas);
                trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
            }
            if (trigger) listener();
        }));
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        return observer;
    }
    function createDetachObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const observer = new MutationObserver((entries => {
            let trigger = false;
            for (const entry of entries) {
                trigger = trigger || nodeListContains(entry.removedNodes, canvas);
                trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
            }
            if (trigger) listener();
        }));
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        return observer;
    }
    const drpListeningCharts = new Map;
    let oldDevicePixelRatio = 0;
    function onWindowResize() {
        const dpr = window.devicePixelRatio;
        if (dpr === oldDevicePixelRatio) return;
        oldDevicePixelRatio = dpr;
        drpListeningCharts.forEach(((resize, chart) => {
            if (chart.currentDevicePixelRatio !== dpr) resize();
        }));
    }
    function listenDevicePixelRatioChanges(chart, resize) {
        if (!drpListeningCharts.size) window.addEventListener("resize", onWindowResize);
        drpListeningCharts.set(chart, resize);
    }
    function unlistenDevicePixelRatioChanges(chart) {
        drpListeningCharts.delete(chart);
        if (!drpListeningCharts.size) window.removeEventListener("resize", onWindowResize);
    }
    function createResizeObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const container = canvas && _getParentNode(canvas);
        if (!container) return;
        const resize = throttled(((width, height) => {
            const w = container.clientWidth;
            listener(width, height);
            if (w < container.clientWidth) listener();
        }), window);
        const observer = new ResizeObserver((entries => {
            const entry = entries[0];
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            if (width === 0 && height === 0) return;
            resize(width, height);
        }));
        observer.observe(container);
        listenDevicePixelRatioChanges(chart, resize);
        return observer;
    }
    function releaseObserver(chart, type, observer) {
        if (observer) observer.disconnect();
        if (type === "resize") unlistenDevicePixelRatioChanges(chart);
    }
    function createProxyAndListen(chart, type, listener) {
        const canvas = chart.canvas;
        const proxy = throttled((event => {
            if (chart.ctx !== null) listener(fromNativeEvent(event, chart));
        }), chart);
        addListener(canvas, type, proxy);
        return proxy;
    }
    class DomPlatform extends BasePlatform {
        acquireContext(canvas, aspectRatio) {
            const context = canvas && canvas.getContext && canvas.getContext("2d");
            if (context && context.canvas === canvas) {
                initCanvas(canvas, aspectRatio);
                return context;
            }
            return null;
        }
        releaseContext(context) {
            const canvas = context.canvas;
            if (!canvas[EXPANDO_KEY]) return false;
            const initial = canvas[EXPANDO_KEY].initial;
            [ "height", "width" ].forEach((prop => {
                const value = initial[prop];
                if (isNullOrUndef(value)) canvas.removeAttribute(prop); else canvas.setAttribute(prop, value);
            }));
            const style = initial.style || {};
            Object.keys(style).forEach((key => {
                canvas.style[key] = style[key];
            }));
            canvas.width = canvas.width;
            delete canvas[EXPANDO_KEY];
            return true;
        }
        addEventListener(chart, type, listener) {
            this.removeEventListener(chart, type);
            const proxies = chart.$proxies || (chart.$proxies = {});
            const handlers = {
                attach: createAttachObserver,
                detach: createDetachObserver,
                resize: createResizeObserver
            };
            const handler = handlers[type] || createProxyAndListen;
            proxies[type] = handler(chart, type, listener);
        }
        removeEventListener(chart, type) {
            const proxies = chart.$proxies || (chart.$proxies = {});
            const proxy = proxies[type];
            if (!proxy) return;
            const handlers = {
                attach: releaseObserver,
                detach: releaseObserver,
                resize: releaseObserver
            };
            const handler = handlers[type] || removeListener;
            handler(chart, type, proxy);
            proxies[type] = void 0;
        }
        getDevicePixelRatio() {
            return window.devicePixelRatio;
        }
        getMaximumSize(canvas, width, height, aspectRatio) {
            return getMaximumSize(canvas, width, height, aspectRatio);
        }
        isAttached(canvas) {
            const container = canvas && _getParentNode(canvas);
            return !!(container && container.isConnected);
        }
    }
    function _detectPlatform(canvas) {
        if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) return BasicPlatform;
        return DomPlatform;
    }
    class Element {
        static defaults={};
        static defaultRoutes=void 0;
        x;
        y;
        active=false;
        options;
        $animations;
        tooltipPosition(useFinalPosition) {
            const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
            return {
                x,
                y
            };
        }
        hasValue() {
            return isNumber(this.x) && isNumber(this.y);
        }
        getProps(props, final) {
            const anims = this.$animations;
            if (!final || !anims) return this;
            const ret = {};
            props.forEach((prop => {
                ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
            }));
            return ret;
        }
    }
    function autoSkip(scale, ticks) {
        const tickOpts = scale.options.ticks;
        const determinedMaxTicks = determineMaxTicks(scale);
        const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
        const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
        const numMajorIndices = majorIndices.length;
        const first = majorIndices[0];
        const last = majorIndices[numMajorIndices - 1];
        const newTicks = [];
        if (numMajorIndices > ticksLimit) {
            skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
            return newTicks;
        }
        const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
        if (numMajorIndices > 0) {
            let i, ilen;
            const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
            skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
            for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
            skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
            return newTicks;
        }
        skip(ticks, newTicks, spacing);
        return newTicks;
    }
    function determineMaxTicks(scale) {
        const offset = scale.options.offset;
        const tickLength = scale._tickSize();
        const maxScale = scale._length / tickLength + (offset ? 0 : 1);
        const maxChart = scale._maxLength / tickLength;
        return Math.floor(Math.min(maxScale, maxChart));
    }
    function calculateSpacing(majorIndices, ticks, ticksLimit) {
        const evenMajorSpacing = getEvenSpacing(majorIndices);
        const spacing = ticks.length / ticksLimit;
        if (!evenMajorSpacing) return Math.max(spacing, 1);
        const factors = _factorize(evenMajorSpacing);
        for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
            const factor = factors[i];
            if (factor > spacing) return factor;
        }
        return Math.max(spacing, 1);
    }
    function getMajorIndices(ticks) {
        const result = [];
        let i, ilen;
        for (i = 0, ilen = ticks.length; i < ilen; i++) if (ticks[i].major) result.push(i);
        return result;
    }
    function skipMajors(ticks, newTicks, majorIndices, spacing) {
        let count = 0;
        let next = majorIndices[0];
        let i;
        spacing = Math.ceil(spacing);
        for (i = 0; i < ticks.length; i++) if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = majorIndices[count * spacing];
        }
    }
    function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
        const start = valueOrDefault(majorStart, 0);
        const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
        let count = 0;
        let length, i, next;
        spacing = Math.ceil(spacing);
        if (majorEnd) {
            length = majorEnd - majorStart;
            spacing = length / Math.floor(length / spacing);
        }
        next = start;
        while (next < 0) {
            count++;
            next = Math.round(start + count * spacing);
        }
        for (i = Math.max(start, 0); i < end; i++) if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = Math.round(start + count * spacing);
        }
    }
    function getEvenSpacing(arr) {
        const len = arr.length;
        let i, diff;
        if (len < 2) return false;
        for (diff = arr[0], i = 1; i < len; ++i) if (arr[i] - arr[i - 1] !== diff) return false;
        return diff;
    }
    const reverseAlign = align => align === "left" ? "right" : align === "right" ? "left" : align;
    const offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
    const getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
    function sample(arr, numItems) {
        const result = [];
        const increment = arr.length / numItems;
        const len = arr.length;
        let i = 0;
        for (;i < len; i += increment) result.push(arr[Math.floor(i)]);
        return result;
    }
    function getPixelForGridLine(scale, index, offsetGridLines) {
        const length = scale.ticks.length;
        const validIndex = Math.min(index, length - 1);
        const start = scale._startPixel;
        const end = scale._endPixel;
        const epsilon = 1e-6;
        let lineValue = scale.getPixelForTick(validIndex);
        let offset;
        if (offsetGridLines) {
            if (length === 1) offset = Math.max(lineValue - start, end - lineValue); else if (index === 0) offset = (scale.getPixelForTick(1) - lineValue) / 2; else offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
            lineValue += validIndex < index ? offset : -offset;
            if (lineValue < start - epsilon || lineValue > end + epsilon) return;
        }
        return lineValue;
    }
    function garbageCollect(caches, length) {
        each(caches, (cache => {
            const gc = cache.gc;
            const gcLen = gc.length / 2;
            let i;
            if (gcLen > length) {
                for (i = 0; i < gcLen; ++i) delete cache.data[gc[i]];
                gc.splice(0, gcLen);
            }
        }));
    }
    function getTickMarkLength(options) {
        return options.drawTicks ? options.tickLength : 0;
    }
    function getTitleHeight(options, fallback) {
        if (!options.display) return 0;
        const font = toFont(options.font, fallback);
        const padding = toPadding(options.padding);
        const lines = isArray(options.text) ? options.text.length : 1;
        return lines * font.lineHeight + padding.height;
    }
    function createScaleContext(parent, scale) {
        return createContext(parent, {
            scale,
            type: "scale"
        });
    }
    function createTickContext(parent, index, tick) {
        return createContext(parent, {
            tick,
            index,
            type: "tick"
        });
    }
    function titleAlign(align, position, reverse) {
        let ret = _toLeftRightCenter(align);
        if (reverse && position !== "right" || !reverse && position === "right") ret = reverseAlign(ret);
        return ret;
    }
    function titleArgs(scale, offset, position, align) {
        const {top, left, bottom, right, chart} = scale;
        const {chartArea, scales} = chart;
        let rotation = 0;
        let maxWidth, titleX, titleY;
        const height = bottom - top;
        const width = right - left;
        if (scale.isHorizontal()) {
            titleX = _alignStartEnd(align, left, right);
            if (helpers_segment_isObject(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
            } else if (position === "center") titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset; else titleY = offsetFromEdge(scale, position, offset);
            maxWidth = right - left;
        } else {
            if (helpers_segment_isObject(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
            } else if (position === "center") titleX = (chartArea.left + chartArea.right) / 2 - width + offset; else titleX = offsetFromEdge(scale, position, offset);
            titleY = _alignStartEnd(align, bottom, top);
            rotation = position === "left" ? -HALF_PI : HALF_PI;
        }
        return {
            titleX,
            titleY,
            maxWidth,
            rotation
        };
    }
    class Scale extends Element {
        constructor(cfg) {
            super();
            this.id = cfg.id;
            this.type = cfg.type;
            this.options = void 0;
            this.ctx = cfg.ctx;
            this.chart = cfg.chart;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.width = void 0;
            this.height = void 0;
            this._margins = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            this.maxWidth = void 0;
            this.maxHeight = void 0;
            this.paddingTop = void 0;
            this.paddingBottom = void 0;
            this.paddingLeft = void 0;
            this.paddingRight = void 0;
            this.axis = void 0;
            this.labelRotation = void 0;
            this.min = void 0;
            this.max = void 0;
            this._range = void 0;
            this.ticks = [];
            this._gridLineItems = null;
            this._labelItems = null;
            this._labelSizes = null;
            this._length = 0;
            this._maxLength = 0;
            this._longestTextCache = {};
            this._startPixel = void 0;
            this._endPixel = void 0;
            this._reversePixels = false;
            this._userMax = void 0;
            this._userMin = void 0;
            this._suggestedMax = void 0;
            this._suggestedMin = void 0;
            this._ticksLength = 0;
            this._borderValue = 0;
            this._cache = {};
            this._dataLimitsCached = false;
            this.$context = void 0;
        }
        init(options) {
            this.options = options.setContext(this.getContext());
            this.axis = options.axis;
            this._userMin = this.parse(options.min);
            this._userMax = this.parse(options.max);
            this._suggestedMin = this.parse(options.suggestedMin);
            this._suggestedMax = this.parse(options.suggestedMax);
        }
        parse(raw, index) {
            return raw;
        }
        getUserBounds() {
            let {_userMin, _userMax, _suggestedMin, _suggestedMax} = this;
            _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
            _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
            _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
            _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
            return {
                min: finiteOrDefault(_userMin, _suggestedMin),
                max: finiteOrDefault(_userMax, _suggestedMax),
                minDefined: isNumberFinite(_userMin),
                maxDefined: isNumberFinite(_userMax)
            };
        }
        getMinMax(canStack) {
            let {min, max, minDefined, maxDefined} = this.getUserBounds();
            let range;
            if (minDefined && maxDefined) return {
                min,
                max
            };
            const metas = this.getMatchingVisibleMetas();
            for (let i = 0, ilen = metas.length; i < ilen; ++i) {
                range = metas[i].controller.getMinMax(this, canStack);
                if (!minDefined) min = Math.min(min, range.min);
                if (!maxDefined) max = Math.max(max, range.max);
            }
            min = maxDefined && min > max ? max : min;
            max = minDefined && min > max ? min : max;
            return {
                min: finiteOrDefault(min, finiteOrDefault(max, min)),
                max: finiteOrDefault(max, finiteOrDefault(min, max))
            };
        }
        getPadding() {
            return {
                left: this.paddingLeft || 0,
                top: this.paddingTop || 0,
                right: this.paddingRight || 0,
                bottom: this.paddingBottom || 0
            };
        }
        getTicks() {
            return this.ticks;
        }
        getLabels() {
            const data = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
        }
        getLabelItems(chartArea = this.chart.chartArea) {
            const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
            return items;
        }
        beforeLayout() {
            this._cache = {};
            this._dataLimitsCached = false;
        }
        beforeUpdate() {
            callback(this.options.beforeUpdate, [ this ]);
        }
        update(maxWidth, maxHeight, margins) {
            const {beginAtZero, grace, ticks: tickOpts} = this.options;
            const sampleSize = tickOpts.sampleSize;
            this.beforeUpdate();
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this._margins = margins = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, margins);
            this.ticks = null;
            this._labelSizes = null;
            this._gridLineItems = null;
            this._labelItems = null;
            this.beforeSetDimensions();
            this.setDimensions();
            this.afterSetDimensions();
            this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
            if (!this._dataLimitsCached) {
                this.beforeDataLimits();
                this.determineDataLimits();
                this.afterDataLimits();
                this._range = _addGrace(this, grace, beginAtZero);
                this._dataLimitsCached = true;
            }
            this.beforeBuildTicks();
            this.ticks = this.buildTicks() || [];
            this.afterBuildTicks();
            const samplingEnabled = sampleSize < this.ticks.length;
            this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
            this.configure();
            this.beforeCalculateLabelRotation();
            this.calculateLabelRotation();
            this.afterCalculateLabelRotation();
            if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
                this.ticks = autoSkip(this, this.ticks);
                this._labelSizes = null;
                this.afterAutoSkip();
            }
            if (samplingEnabled) this._convertTicksToLabels(this.ticks);
            this.beforeFit();
            this.fit();
            this.afterFit();
            this.afterUpdate();
        }
        configure() {
            let reversePixels = this.options.reverse;
            let startPixel, endPixel;
            if (this.isHorizontal()) {
                startPixel = this.left;
                endPixel = this.right;
            } else {
                startPixel = this.top;
                endPixel = this.bottom;
                reversePixels = !reversePixels;
            }
            this._startPixel = startPixel;
            this._endPixel = endPixel;
            this._reversePixels = reversePixels;
            this._length = endPixel - startPixel;
            this._alignToPixels = this.options.alignToPixels;
        }
        afterUpdate() {
            callback(this.options.afterUpdate, [ this ]);
        }
        beforeSetDimensions() {
            callback(this.options.beforeSetDimensions, [ this ]);
        }
        setDimensions() {
            if (this.isHorizontal()) {
                this.width = this.maxWidth;
                this.left = 0;
                this.right = this.width;
            } else {
                this.height = this.maxHeight;
                this.top = 0;
                this.bottom = this.height;
            }
            this.paddingLeft = 0;
            this.paddingTop = 0;
            this.paddingRight = 0;
            this.paddingBottom = 0;
        }
        afterSetDimensions() {
            callback(this.options.afterSetDimensions, [ this ]);
        }
        _callHooks(name) {
            this.chart.notifyPlugins(name, this.getContext());
            callback(this.options[name], [ this ]);
        }
        beforeDataLimits() {
            this._callHooks("beforeDataLimits");
        }
        determineDataLimits() {}
        afterDataLimits() {
            this._callHooks("afterDataLimits");
        }
        beforeBuildTicks() {
            this._callHooks("beforeBuildTicks");
        }
        buildTicks() {
            return [];
        }
        afterBuildTicks() {
            this._callHooks("afterBuildTicks");
        }
        beforeTickToLabelConversion() {
            callback(this.options.beforeTickToLabelConversion, [ this ]);
        }
        generateTickLabels(ticks) {
            const tickOpts = this.options.ticks;
            let i, ilen, tick;
            for (i = 0, ilen = ticks.length; i < ilen; i++) {
                tick = ticks[i];
                tick.label = callback(tickOpts.callback, [ tick.value, i, ticks ], this);
            }
        }
        afterTickToLabelConversion() {
            callback(this.options.afterTickToLabelConversion, [ this ]);
        }
        beforeCalculateLabelRotation() {
            callback(this.options.beforeCalculateLabelRotation, [ this ]);
        }
        calculateLabelRotation() {
            const options = this.options;
            const tickOpts = options.ticks;
            const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
            const minRotation = tickOpts.minRotation || 0;
            const maxRotation = tickOpts.maxRotation;
            let labelRotation = minRotation;
            let tickWidth, maxHeight, maxLabelDiagonal;
            if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
                this.labelRotation = minRotation;
                return;
            }
            const labelSizes = this._getLabelSizes();
            const maxLabelWidth = labelSizes.widest.width;
            const maxLabelHeight = labelSizes.highest.height;
            const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
            tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
            if (maxLabelWidth + 6 > tickWidth) {
                tickWidth = maxWidth / (numTicks - (options.offset ? .5 : 1));
                maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
                maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
                labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
                labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
            }
            this.labelRotation = labelRotation;
        }
        afterCalculateLabelRotation() {
            callback(this.options.afterCalculateLabelRotation, [ this ]);
        }
        afterAutoSkip() {}
        beforeFit() {
            callback(this.options.beforeFit, [ this ]);
        }
        fit() {
            const minSize = {
                width: 0,
                height: 0
            };
            const {chart, options: {ticks: tickOpts, title: titleOpts, grid: gridOpts}} = this;
            const display = this._isVisible();
            const isHorizontal = this.isHorizontal();
            if (display) {
                const titleHeight = getTitleHeight(titleOpts, chart.options.font);
                if (isHorizontal) {
                    minSize.width = this.maxWidth;
                    minSize.height = getTickMarkLength(gridOpts) + titleHeight;
                } else {
                    minSize.height = this.maxHeight;
                    minSize.width = getTickMarkLength(gridOpts) + titleHeight;
                }
                if (tickOpts.display && this.ticks.length) {
                    const {first, last, widest, highest} = this._getLabelSizes();
                    const tickPadding = tickOpts.padding * 2;
                    const angleRadians = toRadians(this.labelRotation);
                    const cos = Math.cos(angleRadians);
                    const sin = Math.sin(angleRadians);
                    if (isHorizontal) {
                        const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                        minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                    } else {
                        const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                        minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                    }
                    this._calculatePadding(first, last, sin, cos);
                }
            }
            this._handleMargins();
            if (isHorizontal) {
                this.width = this._length = chart.width - this._margins.left - this._margins.right;
                this.height = minSize.height;
            } else {
                this.width = minSize.width;
                this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
            }
        }
        _calculatePadding(first, last, sin, cos) {
            const {ticks: {align, padding}, position} = this.options;
            const isRotated = this.labelRotation !== 0;
            const labelsBelowTicks = position !== "top" && this.axis === "x";
            if (this.isHorizontal()) {
                const offsetLeft = this.getPixelForTick(0) - this.left;
                const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
                let paddingLeft = 0;
                let paddingRight = 0;
                if (isRotated) if (labelsBelowTicks) {
                    paddingLeft = cos * first.width;
                    paddingRight = sin * last.height;
                } else {
                    paddingLeft = sin * first.height;
                    paddingRight = cos * last.width;
                } else if (align === "start") paddingRight = last.width; else if (align === "end") paddingLeft = first.width; else if (align !== "inner") {
                    paddingLeft = first.width / 2;
                    paddingRight = last.width / 2;
                }
                this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
                this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
            } else {
                let paddingTop = last.height / 2;
                let paddingBottom = first.height / 2;
                if (align === "start") {
                    paddingTop = 0;
                    paddingBottom = first.height;
                } else if (align === "end") {
                    paddingTop = last.height;
                    paddingBottom = 0;
                }
                this.paddingTop = paddingTop + padding;
                this.paddingBottom = paddingBottom + padding;
            }
        }
        _handleMargins() {
            if (this._margins) {
                this._margins.left = Math.max(this.paddingLeft, this._margins.left);
                this._margins.top = Math.max(this.paddingTop, this._margins.top);
                this._margins.right = Math.max(this.paddingRight, this._margins.right);
                this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
            }
        }
        afterFit() {
            callback(this.options.afterFit, [ this ]);
        }
        isHorizontal() {
            const {axis, position} = this.options;
            return position === "top" || position === "bottom" || axis === "x";
        }
        isFullSize() {
            return this.options.fullSize;
        }
        _convertTicksToLabels(ticks) {
            this.beforeTickToLabelConversion();
            this.generateTickLabels(ticks);
            let i, ilen;
            for (i = 0, ilen = ticks.length; i < ilen; i++) if (isNullOrUndef(ticks[i].label)) {
                ticks.splice(i, 1);
                ilen--;
                i--;
            }
            this.afterTickToLabelConversion();
        }
        _getLabelSizes() {
            let labelSizes = this._labelSizes;
            if (!labelSizes) {
                const sampleSize = this.options.ticks.sampleSize;
                let ticks = this.ticks;
                if (sampleSize < ticks.length) ticks = sample(ticks, sampleSize);
                this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
            }
            return labelSizes;
        }
        _computeLabelSizes(ticks, length, maxTicksLimit) {
            const {ctx, _longestTextCache: caches} = this;
            const widths = [];
            const heights = [];
            const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
            let widestLabelSize = 0;
            let highestLabelSize = 0;
            let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
            for (i = 0; i < length; i += increment) {
                label = ticks[i].label;
                tickFont = this._resolveTickFontOptions(i);
                ctx.font = fontString = tickFont.string;
                cache = caches[fontString] = caches[fontString] || {
                    data: {},
                    gc: []
                };
                lineHeight = tickFont.lineHeight;
                width = height = 0;
                if (!isNullOrUndef(label) && !isArray(label)) {
                    width = _measureText(ctx, cache.data, cache.gc, width, label);
                    height = lineHeight;
                } else if (isArray(label)) for (j = 0, jlen = label.length; j < jlen; ++j) {
                    nestedLabel = label[j];
                    if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                        width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                        height += lineHeight;
                    }
                }
                widths.push(width);
                heights.push(height);
                widestLabelSize = Math.max(width, widestLabelSize);
                highestLabelSize = Math.max(height, highestLabelSize);
            }
            garbageCollect(caches, length);
            const widest = widths.indexOf(widestLabelSize);
            const highest = heights.indexOf(highestLabelSize);
            const valueAt = idx => ({
                width: widths[idx] || 0,
                height: heights[idx] || 0
            });
            return {
                first: valueAt(0),
                last: valueAt(length - 1),
                widest: valueAt(widest),
                highest: valueAt(highest),
                widths,
                heights
            };
        }
        getLabelForValue(value) {
            return value;
        }
        getPixelForValue(value, index) {
            return NaN;
        }
        getValueForPixel(pixel) {}
        getPixelForTick(index) {
            const ticks = this.ticks;
            if (index < 0 || index > ticks.length - 1) return null;
            return this.getPixelForValue(ticks[index].value);
        }
        getPixelForDecimal(decimal) {
            if (this._reversePixels) decimal = 1 - decimal;
            const pixel = this._startPixel + decimal * this._length;
            return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
        }
        getDecimalForPixel(pixel) {
            const decimal = (pixel - this._startPixel) / this._length;
            return this._reversePixels ? 1 - decimal : decimal;
        }
        getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
        }
        getBaseValue() {
            const {min, max} = this;
            return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
        }
        getContext(index) {
            const ticks = this.ticks || [];
            if (index >= 0 && index < ticks.length) {
                const tick = ticks[index];
                return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
            }
            return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
        }
        _tickSize() {
            const optionTicks = this.options.ticks;
            const rot = toRadians(this.labelRotation);
            const cos = Math.abs(Math.cos(rot));
            const sin = Math.abs(Math.sin(rot));
            const labelSizes = this._getLabelSizes();
            const padding = optionTicks.autoSkipPadding || 0;
            const w = labelSizes ? labelSizes.widest.width + padding : 0;
            const h = labelSizes ? labelSizes.highest.height + padding : 0;
            return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
        }
        _isVisible() {
            const display = this.options.display;
            if (display !== "auto") return !!display;
            return this.getMatchingVisibleMetas().length > 0;
        }
        _computeGridLineItems(chartArea) {
            const axis = this.axis;
            const chart = this.chart;
            const options = this.options;
            const {grid, position, border} = options;
            const offset = grid.offset;
            const isHorizontal = this.isHorizontal();
            const ticks = this.ticks;
            const ticksLength = ticks.length + (offset ? 1 : 0);
            const tl = getTickMarkLength(grid);
            const items = [];
            const borderOpts = border.setContext(this.getContext());
            const axisWidth = borderOpts.display ? borderOpts.width : 0;
            const axisHalfWidth = axisWidth / 2;
            const alignBorderValue = function(pixel) {
                return _alignPixel(chart, pixel, axisWidth);
            };
            let borderValue, i, lineValue, alignedLineValue;
            let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
            if (position === "top") {
                borderValue = alignBorderValue(this.bottom);
                ty1 = this.bottom - tl;
                ty2 = borderValue - axisHalfWidth;
                y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
                y2 = chartArea.bottom;
            } else if (position === "bottom") {
                borderValue = alignBorderValue(this.top);
                y1 = chartArea.top;
                y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
                ty1 = borderValue + axisHalfWidth;
                ty2 = this.top + tl;
            } else if (position === "left") {
                borderValue = alignBorderValue(this.right);
                tx1 = this.right - tl;
                tx2 = borderValue - axisHalfWidth;
                x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
                x2 = chartArea.right;
            } else if (position === "right") {
                borderValue = alignBorderValue(this.left);
                x1 = chartArea.left;
                x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
                tx1 = borderValue + axisHalfWidth;
                tx2 = this.left + tl;
            } else if (axis === "x") {
                if (position === "center") borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + .5); else if (helpers_segment_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
                }
                y1 = chartArea.top;
                y2 = chartArea.bottom;
                ty1 = borderValue + axisHalfWidth;
                ty2 = ty1 + tl;
            } else if (axis === "y") {
                if (position === "center") borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2); else if (helpers_segment_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
                }
                tx1 = borderValue - axisHalfWidth;
                tx2 = tx1 - tl;
                x1 = chartArea.left;
                x2 = chartArea.right;
            }
            const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
            const step = Math.max(1, Math.ceil(ticksLength / limit));
            for (i = 0; i < ticksLength; i += step) {
                const context = this.getContext(i);
                const optsAtIndex = grid.setContext(context);
                const optsAtIndexBorder = border.setContext(context);
                const lineWidth = optsAtIndex.lineWidth;
                const lineColor = optsAtIndex.color;
                const borderDash = optsAtIndexBorder.dash || [];
                const borderDashOffset = optsAtIndexBorder.dashOffset;
                const tickWidth = optsAtIndex.tickWidth;
                const tickColor = optsAtIndex.tickColor;
                const tickBorderDash = optsAtIndex.tickBorderDash || [];
                const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
                lineValue = getPixelForGridLine(this, i, offset);
                if (lineValue === void 0) continue;
                alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
                if (isHorizontal) tx1 = tx2 = x1 = x2 = alignedLineValue; else ty1 = ty2 = y1 = y2 = alignedLineValue;
                items.push({
                    tx1,
                    ty1,
                    tx2,
                    ty2,
                    x1,
                    y1,
                    x2,
                    y2,
                    width: lineWidth,
                    color: lineColor,
                    borderDash,
                    borderDashOffset,
                    tickWidth,
                    tickColor,
                    tickBorderDash,
                    tickBorderDashOffset
                });
            }
            this._ticksLength = ticksLength;
            this._borderValue = borderValue;
            return items;
        }
        _computeLabelItems(chartArea) {
            const axis = this.axis;
            const options = this.options;
            const {position, ticks: optionTicks} = options;
            const isHorizontal = this.isHorizontal();
            const ticks = this.ticks;
            const {align, crossAlign, padding, mirror} = optionTicks;
            const tl = getTickMarkLength(options.grid);
            const tickAndPadding = tl + padding;
            const hTickAndPadding = mirror ? -padding : tickAndPadding;
            const rotation = -toRadians(this.labelRotation);
            const items = [];
            let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
            let textBaseline = "middle";
            if (position === "top") {
                y = this.bottom - hTickAndPadding;
                textAlign = this._getXAxisLabelAlignment();
            } else if (position === "bottom") {
                y = this.top + hTickAndPadding;
                textAlign = this._getXAxisLabelAlignment();
            } else if (position === "left") {
                const ret = this._getYAxisLabelAlignment(tl);
                textAlign = ret.textAlign;
                x = ret.x;
            } else if (position === "right") {
                const ret = this._getYAxisLabelAlignment(tl);
                textAlign = ret.textAlign;
                x = ret.x;
            } else if (axis === "x") {
                if (position === "center") y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding; else if (helpers_segment_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
                }
                textAlign = this._getXAxisLabelAlignment();
            } else if (axis === "y") {
                if (position === "center") x = (chartArea.left + chartArea.right) / 2 - tickAndPadding; else if (helpers_segment_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    x = this.chart.scales[positionAxisID].getPixelForValue(value);
                }
                textAlign = this._getYAxisLabelAlignment(tl).textAlign;
            }
            if (axis === "y") if (align === "start") textBaseline = "top"; else if (align === "end") textBaseline = "bottom";
            const labelSizes = this._getLabelSizes();
            for (i = 0, ilen = ticks.length; i < ilen; ++i) {
                tick = ticks[i];
                label = tick.label;
                const optsAtIndex = optionTicks.setContext(this.getContext(i));
                pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
                font = this._resolveTickFontOptions(i);
                lineHeight = font.lineHeight;
                lineCount = isArray(label) ? label.length : 1;
                const halfCount = lineCount / 2;
                const color = optsAtIndex.color;
                const strokeColor = optsAtIndex.textStrokeColor;
                const strokeWidth = optsAtIndex.textStrokeWidth;
                let tickTextAlign = textAlign;
                if (isHorizontal) {
                    x = pixel;
                    if (textAlign === "inner") if (i === ilen - 1) tickTextAlign = !this.options.reverse ? "right" : "left"; else if (i === 0) tickTextAlign = !this.options.reverse ? "left" : "right"; else tickTextAlign = "center";
                    if (position === "top") if (crossAlign === "near" || rotation !== 0) textOffset = -lineCount * lineHeight + lineHeight / 2; else if (crossAlign === "center") textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight; else textOffset = -labelSizes.highest.height + lineHeight / 2; else if (crossAlign === "near" || rotation !== 0) textOffset = lineHeight / 2; else if (crossAlign === "center") textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight; else textOffset = labelSizes.highest.height - lineCount * lineHeight;
                    if (mirror) textOffset *= -1;
                    if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) x += lineHeight / 2 * Math.sin(rotation);
                } else {
                    y = pixel;
                    textOffset = (1 - lineCount) * lineHeight / 2;
                }
                let backdrop;
                if (optsAtIndex.showLabelBackdrop) {
                    const labelPadding = toPadding(optsAtIndex.backdropPadding);
                    const height = labelSizes.heights[i];
                    const width = labelSizes.widths[i];
                    let top = textOffset - labelPadding.top;
                    let left = 0 - labelPadding.left;
                    switch (textBaseline) {
                      case "middle":
                        top -= height / 2;
                        break;

                      case "bottom":
                        top -= height;
                        break;
                    }
                    switch (textAlign) {
                      case "center":
                        left -= width / 2;
                        break;

                      case "right":
                        left -= width;
                        break;

                      case "inner":
                        if (i === ilen - 1) left -= width; else if (i > 0) left -= width / 2;
                        break;
                    }
                    backdrop = {
                        left,
                        top,
                        width: width + labelPadding.width,
                        height: height + labelPadding.height,
                        color: optsAtIndex.backdropColor
                    };
                }
                items.push({
                    label,
                    font,
                    textOffset,
                    options: {
                        rotation,
                        color,
                        strokeColor,
                        strokeWidth,
                        textAlign: tickTextAlign,
                        textBaseline,
                        translation: [ x, y ],
                        backdrop
                    }
                });
            }
            return items;
        }
        _getXAxisLabelAlignment() {
            const {position, ticks} = this.options;
            const rotation = -toRadians(this.labelRotation);
            if (rotation) return position === "top" ? "left" : "right";
            let align = "center";
            if (ticks.align === "start") align = "left"; else if (ticks.align === "end") align = "right"; else if (ticks.align === "inner") align = "inner";
            return align;
        }
        _getYAxisLabelAlignment(tl) {
            const {position, ticks: {crossAlign, mirror, padding}} = this.options;
            const labelSizes = this._getLabelSizes();
            const tickAndPadding = tl + padding;
            const widest = labelSizes.widest.width;
            let textAlign;
            let x;
            if (position === "left") if (mirror) {
                x = this.right + padding;
                if (crossAlign === "near") textAlign = "left"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x += widest / 2;
                } else {
                    textAlign = "right";
                    x += widest;
                }
            } else {
                x = this.right - tickAndPadding;
                if (crossAlign === "near") textAlign = "right"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x -= widest / 2;
                } else {
                    textAlign = "left";
                    x = this.left;
                }
            } else if (position === "right") if (mirror) {
                x = this.left + padding;
                if (crossAlign === "near") textAlign = "right"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x -= widest / 2;
                } else {
                    textAlign = "left";
                    x -= widest;
                }
            } else {
                x = this.left + tickAndPadding;
                if (crossAlign === "near") textAlign = "left"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x += widest / 2;
                } else {
                    textAlign = "right";
                    x = this.right;
                }
            } else textAlign = "right";
            return {
                textAlign,
                x
            };
        }
        _computeLabelArea() {
            if (this.options.ticks.mirror) return;
            const chart = this.chart;
            const position = this.options.position;
            if (position === "left" || position === "right") return {
                top: 0,
                left: this.left,
                bottom: chart.height,
                right: this.right
            };
            if (position === "top" || position === "bottom") return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: chart.width
            };
        }
        drawBackground() {
            const {ctx, options: {backgroundColor}, left, top, width, height} = this;
            if (backgroundColor) {
                ctx.save();
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(left, top, width, height);
                ctx.restore();
            }
        }
        getLineWidthForValue(value) {
            const grid = this.options.grid;
            if (!this._isVisible() || !grid.display) return 0;
            const ticks = this.ticks;
            const index = ticks.findIndex((t => t.value === value));
            if (index >= 0) {
                const opts = grid.setContext(this.getContext(index));
                return opts.lineWidth;
            }
            return 0;
        }
        drawGrid(chartArea) {
            const grid = this.options.grid;
            const ctx = this.ctx;
            const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
            let i, ilen;
            const drawLine = (p1, p2, style) => {
                if (!style.width || !style.color) return;
                ctx.save();
                ctx.lineWidth = style.width;
                ctx.strokeStyle = style.color;
                ctx.setLineDash(style.borderDash || []);
                ctx.lineDashOffset = style.borderDashOffset;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
                ctx.restore();
            };
            if (grid.display) for (i = 0, ilen = items.length; i < ilen; ++i) {
                const item = items[i];
                if (grid.drawOnChartArea) drawLine({
                    x: item.x1,
                    y: item.y1
                }, {
                    x: item.x2,
                    y: item.y2
                }, item);
                if (grid.drawTicks) drawLine({
                    x: item.tx1,
                    y: item.ty1
                }, {
                    x: item.tx2,
                    y: item.ty2
                }, {
                    color: item.tickColor,
                    width: item.tickWidth,
                    borderDash: item.tickBorderDash,
                    borderDashOffset: item.tickBorderDashOffset
                });
            }
        }
        drawBorder() {
            const {chart, ctx, options: {border, grid}} = this;
            const borderOpts = border.setContext(this.getContext());
            const axisWidth = border.display ? borderOpts.width : 0;
            if (!axisWidth) return;
            const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
            const borderValue = this._borderValue;
            let x1, x2, y1, y2;
            if (this.isHorizontal()) {
                x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
                x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
                y1 = y2 = borderValue;
            } else {
                y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
                y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
                x1 = x2 = borderValue;
            }
            ctx.save();
            ctx.lineWidth = borderOpts.width;
            ctx.strokeStyle = borderOpts.color;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        }
        drawLabels(chartArea) {
            const optionTicks = this.options.ticks;
            if (!optionTicks.display) return;
            const ctx = this.ctx;
            const area = this._computeLabelArea();
            if (area) clipArea(ctx, area);
            const items = this.getLabelItems(chartArea);
            for (const item of items) {
                const renderTextOptions = item.options;
                const tickFont = item.font;
                const label = item.label;
                const y = item.textOffset;
                renderText(ctx, label, 0, y, tickFont, renderTextOptions);
            }
            if (area) unclipArea(ctx);
        }
        drawTitle() {
            const {ctx, options: {position, title, reverse}} = this;
            if (!title.display) return;
            const font = toFont(title.font);
            const padding = toPadding(title.padding);
            const align = title.align;
            let offset = font.lineHeight / 2;
            if (position === "bottom" || position === "center" || helpers_segment_isObject(position)) {
                offset += padding.bottom;
                if (isArray(title.text)) offset += font.lineHeight * (title.text.length - 1);
            } else offset += padding.top;
            const {titleX, titleY, maxWidth, rotation} = titleArgs(this, offset, position, align);
            renderText(ctx, title.text, 0, 0, font, {
                color: title.color,
                maxWidth,
                rotation,
                textAlign: titleAlign(align, position, reverse),
                textBaseline: "middle",
                translation: [ titleX, titleY ]
            });
        }
        draw(chartArea) {
            if (!this._isVisible()) return;
            this.drawBackground();
            this.drawGrid(chartArea);
            this.drawBorder();
            this.drawTitle();
            this.drawLabels(chartArea);
        }
        _layers() {
            const opts = this.options;
            const tz = opts.ticks && opts.ticks.z || 0;
            const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
            const bz = valueOrDefault(opts.border && opts.border.z, 0);
            if (!this._isVisible() || this.draw !== Scale.prototype.draw) return [ {
                z: tz,
                draw: chartArea => {
                    this.draw(chartArea);
                }
            } ];
            return [ {
                z: gz,
                draw: chartArea => {
                    this.drawBackground();
                    this.drawGrid(chartArea);
                    this.drawTitle();
                }
            }, {
                z: bz,
                draw: () => {
                    this.drawBorder();
                }
            }, {
                z: tz,
                draw: chartArea => {
                    this.drawLabels(chartArea);
                }
            } ];
        }
        getMatchingVisibleMetas(type) {
            const metas = this.chart.getSortedVisibleDatasetMetas();
            const axisID = this.axis + "AxisID";
            const result = [];
            let i, ilen;
            for (i = 0, ilen = metas.length; i < ilen; ++i) {
                const meta = metas[i];
                if (meta[axisID] === this.id && (!type || meta.type === type)) result.push(meta);
            }
            return result;
        }
        _resolveTickFontOptions(index) {
            const opts = this.options.ticks.setContext(this.getContext(index));
            return toFont(opts.font);
        }
        _maxDigits() {
            const fontSize = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / fontSize;
        }
    }
    class TypedRegistry {
        constructor(type, scope, override) {
            this.type = type;
            this.scope = scope;
            this.override = override;
            this.items = Object.create(null);
        }
        isForType(type) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
        }
        register(item) {
            const proto = Object.getPrototypeOf(item);
            let parentScope;
            if (isIChartComponent(proto)) parentScope = this.register(proto);
            const items = this.items;
            const id = item.id;
            const scope = this.scope + "." + id;
            if (!id) throw new Error("class does not have id: " + item);
            if (id in items) return scope;
            items[id] = item;
            registerDefaults(item, scope, parentScope);
            if (this.override) helpers_segment_defaults.override(item.id, item.overrides);
            return scope;
        }
        get(id) {
            return this.items[id];
        }
        unregister(item) {
            const items = this.items;
            const id = item.id;
            const scope = this.scope;
            if (id in items) delete items[id];
            if (scope && id in helpers_segment_defaults[scope]) {
                delete helpers_segment_defaults[scope][id];
                if (this.override) delete overrides[id];
            }
        }
    }
    function registerDefaults(item, scope, parentScope) {
        const itemDefaults = merge(Object.create(null), [ parentScope ? helpers_segment_defaults.get(parentScope) : {}, helpers_segment_defaults.get(scope), item.defaults ]);
        helpers_segment_defaults.set(scope, itemDefaults);
        if (item.defaultRoutes) routeDefaults(scope, item.defaultRoutes);
        if (item.descriptors) helpers_segment_defaults.describe(scope, item.descriptors);
    }
    function routeDefaults(scope, routes) {
        Object.keys(routes).forEach((property => {
            const propertyParts = property.split(".");
            const sourceName = propertyParts.pop();
            const sourceScope = [ scope ].concat(propertyParts).join(".");
            const parts = routes[property].split(".");
            const targetName = parts.pop();
            const targetScope = parts.join(".");
            helpers_segment_defaults.route(sourceScope, sourceName, targetScope, targetName);
        }));
    }
    function isIChartComponent(proto) {
        return "id" in proto && "defaults" in proto;
    }
    class Registry {
        constructor() {
            this.controllers = new TypedRegistry(DatasetController, "datasets", true);
            this.elements = new TypedRegistry(Element, "elements");
            this.plugins = new TypedRegistry(Object, "plugins");
            this.scales = new TypedRegistry(Scale, "scales");
            this._typedRegistries = [ this.controllers, this.scales, this.elements ];
        }
        add(...args) {
            this._each("register", args);
        }
        remove(...args) {
            this._each("unregister", args);
        }
        addControllers(...args) {
            this._each("register", args, this.controllers);
        }
        addElements(...args) {
            this._each("register", args, this.elements);
        }
        addPlugins(...args) {
            this._each("register", args, this.plugins);
        }
        addScales(...args) {
            this._each("register", args, this.scales);
        }
        getController(id) {
            return this._get(id, this.controllers, "controller");
        }
        getElement(id) {
            return this._get(id, this.elements, "element");
        }
        getPlugin(id) {
            return this._get(id, this.plugins, "plugin");
        }
        getScale(id) {
            return this._get(id, this.scales, "scale");
        }
        removeControllers(...args) {
            this._each("unregister", args, this.controllers);
        }
        removeElements(...args) {
            this._each("unregister", args, this.elements);
        }
        removePlugins(...args) {
            this._each("unregister", args, this.plugins);
        }
        removeScales(...args) {
            this._each("unregister", args, this.scales);
        }
        _each(method, args, typedRegistry) {
            [ ...args ].forEach((arg => {
                const reg = typedRegistry || this._getRegistryForType(arg);
                if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) this._exec(method, reg, arg); else each(arg, (item => {
                    const itemReg = typedRegistry || this._getRegistryForType(item);
                    this._exec(method, itemReg, item);
                }));
            }));
        }
        _exec(method, registry, component) {
            const camelMethod = _capitalize(method);
            callback(component["before" + camelMethod], [], component);
            registry[method](component);
            callback(component["after" + camelMethod], [], component);
        }
        _getRegistryForType(type) {
            for (let i = 0; i < this._typedRegistries.length; i++) {
                const reg = this._typedRegistries[i];
                if (reg.isForType(type)) return reg;
            }
            return this.plugins;
        }
        _get(id, typedRegistry, type) {
            const item = typedRegistry.get(id);
            if (item === void 0) throw new Error('"' + id + '" is not a registered ' + type + ".");
            return item;
        }
    }
    var registry = new Registry;
    class PluginService {
        constructor() {
            this._init = [];
        }
        notify(chart, hook, args, filter) {
            if (hook === "beforeInit") {
                this._init = this._createDescriptors(chart, true);
                this._notify(this._init, chart, "install");
            }
            const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
            const result = this._notify(descriptors, chart, hook, args);
            if (hook === "afterDestroy") {
                this._notify(descriptors, chart, "stop");
                this._notify(this._init, chart, "uninstall");
            }
            return result;
        }
        _notify(descriptors, chart, hook, args) {
            args = args || {};
            for (const descriptor of descriptors) {
                const plugin = descriptor.plugin;
                const method = plugin[hook];
                const params = [ chart, args, descriptor.options ];
                if (callback(method, params, plugin) === false && args.cancelable) return false;
            }
            return true;
        }
        invalidate() {
            if (!isNullOrUndef(this._cache)) {
                this._oldCache = this._cache;
                this._cache = void 0;
            }
        }
        _descriptors(chart) {
            if (this._cache) return this._cache;
            const descriptors = this._cache = this._createDescriptors(chart);
            this._notifyStateChanges(chart);
            return descriptors;
        }
        _createDescriptors(chart, all) {
            const config = chart && chart.config;
            const options = valueOrDefault(config.options && config.options.plugins, {});
            const plugins = allPlugins(config);
            return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
        }
        _notifyStateChanges(chart) {
            const previousDescriptors = this._oldCache || [];
            const descriptors = this._cache;
            const diff = (a, b) => a.filter((x => !b.some((y => x.plugin.id === y.plugin.id))));
            this._notify(diff(previousDescriptors, descriptors), chart, "stop");
            this._notify(diff(descriptors, previousDescriptors), chart, "start");
        }
    }
    function allPlugins(config) {
        const localIds = {};
        const plugins = [];
        const keys = Object.keys(registry.plugins.items);
        for (let i = 0; i < keys.length; i++) plugins.push(registry.getPlugin(keys[i]));
        const local = config.plugins || [];
        for (let i = 0; i < local.length; i++) {
            const plugin = local[i];
            if (plugins.indexOf(plugin) === -1) {
                plugins.push(plugin);
                localIds[plugin.id] = true;
            }
        }
        return {
            plugins,
            localIds
        };
    }
    function getOpts(options, all) {
        if (!all && options === false) return null;
        if (options === true) return {};
        return options;
    }
    function createDescriptors(chart, {plugins, localIds}, options, all) {
        const result = [];
        const context = chart.getContext();
        for (const plugin of plugins) {
            const id = plugin.id;
            const opts = getOpts(options[id], all);
            if (opts === null) continue;
            result.push({
                plugin,
                options: pluginOpts(chart.config, {
                    plugin,
                    local: localIds[id]
                }, opts, context)
            });
        }
        return result;
    }
    function pluginOpts(config, {plugin, local}, opts, context) {
        const keys = config.pluginScopeKeys(plugin);
        const scopes = config.getOptionScopes(opts, keys);
        if (local && plugin.defaults) scopes.push(plugin.defaults);
        return config.createResolver(scopes, context, [ "" ], {
            scriptable: false,
            indexable: false,
            allKeys: true
        });
    }
    function getIndexAxis(type, options) {
        const datasetDefaults = helpers_segment_defaults.datasets[type] || {};
        const datasetOptions = (options.datasets || {})[type] || {};
        return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
    }
    function getAxisFromDefaultScaleID(id, indexAxis) {
        let axis = id;
        if (id === "_index_") axis = indexAxis; else if (id === "_value_") axis = indexAxis === "x" ? "y" : "x";
        return axis;
    }
    function getDefaultScaleIDFromAxis(axis, indexAxis) {
        return axis === indexAxis ? "_index_" : "_value_";
    }
    function idMatchesAxis(id) {
        if (id === "x" || id === "y" || id === "r") return id;
    }
    function axisFromPosition(position) {
        if (position === "top" || position === "bottom") return "x";
        if (position === "left" || position === "right") return "y";
    }
    function determineAxis(id, ...scaleOptions) {
        if (idMatchesAxis(id)) return id;
        for (const opts of scaleOptions) {
            const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
            if (axis) return axis;
        }
        throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
    }
    function getAxisFromDataset(id, axis, dataset) {
        if (dataset[axis + "AxisID"] === id) return {
            axis
        };
    }
    function retrieveAxisFromDatasets(id, config) {
        if (config.data && config.data.datasets) {
            const boundDs = config.data.datasets.filter((d => d.xAxisID === id || d.yAxisID === id));
            if (boundDs.length) return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
        }
        return {};
    }
    function mergeScaleConfig(config, options) {
        const chartDefaults = overrides[config.type] || {
            scales: {}
        };
        const configScales = options.scales || {};
        const chartIndexAxis = getIndexAxis(config.type, options);
        const scales = Object.create(null);
        Object.keys(configScales).forEach((id => {
            const scaleConf = configScales[id];
            if (!helpers_segment_isObject(scaleConf)) return console.error(`Invalid scale configuration for scale: ${id}`);
            if (scaleConf._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
            const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), helpers_segment_defaults.scales[scaleConf.type]);
            const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
            const defaultScaleOptions = chartDefaults.scales || {};
            scales[id] = mergeIf(Object.create(null), [ {
                axis
            }, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId] ]);
        }));
        config.data.datasets.forEach((dataset => {
            const type = dataset.type || config.type;
            const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
            const datasetDefaults = overrides[type] || {};
            const defaultScaleOptions = datasetDefaults.scales || {};
            Object.keys(defaultScaleOptions).forEach((defaultID => {
                const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
                const id = dataset[axis + "AxisID"] || axis;
                scales[id] = scales[id] || Object.create(null);
                mergeIf(scales[id], [ {
                    axis
                }, configScales[id], defaultScaleOptions[defaultID] ]);
            }));
        }));
        Object.keys(scales).forEach((key => {
            const scale = scales[key];
            mergeIf(scale, [ helpers_segment_defaults.scales[scale.type], helpers_segment_defaults.scale ]);
        }));
        return scales;
    }
    function initOptions(config) {
        const options = config.options || (config.options = {});
        options.plugins = valueOrDefault(options.plugins, {});
        options.scales = mergeScaleConfig(config, options);
    }
    function initData(data) {
        data = data || {};
        data.datasets = data.datasets || [];
        data.labels = data.labels || [];
        return data;
    }
    function initConfig(config) {
        config = config || {};
        config.data = initData(config.data);
        initOptions(config);
        return config;
    }
    const keyCache = new Map;
    const keysCached = new Set;
    function cachedKeys(cacheKey, generate) {
        let keys = keyCache.get(cacheKey);
        if (!keys) {
            keys = generate();
            keyCache.set(cacheKey, keys);
            keysCached.add(keys);
        }
        return keys;
    }
    const addIfFound = (set, obj, key) => {
        const opts = resolveObjectKey(obj, key);
        if (opts !== void 0) set.add(opts);
    };
    class Config {
        constructor(config) {
            this._config = initConfig(config);
            this._scopeCache = new Map;
            this._resolverCache = new Map;
        }
        get platform() {
            return this._config.platform;
        }
        get type() {
            return this._config.type;
        }
        set type(type) {
            this._config.type = type;
        }
        get data() {
            return this._config.data;
        }
        set data(data) {
            this._config.data = initData(data);
        }
        get options() {
            return this._config.options;
        }
        set options(options) {
            this._config.options = options;
        }
        get plugins() {
            return this._config.plugins;
        }
        update() {
            const config = this._config;
            this.clearCache();
            initOptions(config);
        }
        clearCache() {
            this._scopeCache.clear();
            this._resolverCache.clear();
        }
        datasetScopeKeys(datasetType) {
            return cachedKeys(datasetType, (() => [ [ `datasets.${datasetType}`, "" ] ]));
        }
        datasetAnimationScopeKeys(datasetType, transition) {
            return cachedKeys(`${datasetType}.transition.${transition}`, (() => [ [ `datasets.${datasetType}.transitions.${transition}`, `transitions.${transition}` ], [ `datasets.${datasetType}`, "" ] ]));
        }
        datasetElementScopeKeys(datasetType, elementType) {
            return cachedKeys(`${datasetType}-${elementType}`, (() => [ [ `datasets.${datasetType}.elements.${elementType}`, `datasets.${datasetType}`, `elements.${elementType}`, "" ] ]));
        }
        pluginScopeKeys(plugin) {
            const id = plugin.id;
            const type = this.type;
            return cachedKeys(`${type}-plugin-${id}`, (() => [ [ `plugins.${id}`, ...plugin.additionalOptionScopes || [] ] ]));
        }
        _cachedScopes(mainScope, resetCache) {
            const _scopeCache = this._scopeCache;
            let cache = _scopeCache.get(mainScope);
            if (!cache || resetCache) {
                cache = new Map;
                _scopeCache.set(mainScope, cache);
            }
            return cache;
        }
        getOptionScopes(mainScope, keyLists, resetCache) {
            const {options, type} = this;
            const cache = this._cachedScopes(mainScope, resetCache);
            const cached = cache.get(keyLists);
            if (cached) return cached;
            const scopes = new Set;
            keyLists.forEach((keys => {
                if (mainScope) {
                    scopes.add(mainScope);
                    keys.forEach((key => addIfFound(scopes, mainScope, key)));
                }
                keys.forEach((key => addIfFound(scopes, options, key)));
                keys.forEach((key => addIfFound(scopes, overrides[type] || {}, key)));
                keys.forEach((key => addIfFound(scopes, helpers_segment_defaults, key)));
                keys.forEach((key => addIfFound(scopes, descriptors, key)));
            }));
            const array = Array.from(scopes);
            if (array.length === 0) array.push(Object.create(null));
            if (keysCached.has(keyLists)) cache.set(keyLists, array);
            return array;
        }
        chartOptionScopes() {
            const {options, type} = this;
            return [ options, overrides[type] || {}, helpers_segment_defaults.datasets[type] || {}, {
                type
            }, helpers_segment_defaults, descriptors ];
        }
        resolveNamedOptions(scopes, names, context, prefixes = [ "" ]) {
            const result = {
                $shared: true
            };
            const {resolver, subPrefixes} = getResolver(this._resolverCache, scopes, prefixes);
            let options = resolver;
            if (needContext(resolver, names)) {
                result.$shared = false;
                context = isFunction(context) ? context() : context;
                const subResolver = this.createResolver(scopes, context, subPrefixes);
                options = _attachContext(resolver, context, subResolver);
            }
            for (const prop of names) result[prop] = options[prop];
            return result;
        }
        createResolver(scopes, context, prefixes = [ "" ], descriptorDefaults) {
            const {resolver} = getResolver(this._resolverCache, scopes, prefixes);
            return helpers_segment_isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
        }
    }
    function getResolver(resolverCache, scopes, prefixes) {
        let cache = resolverCache.get(scopes);
        if (!cache) {
            cache = new Map;
            resolverCache.set(scopes, cache);
        }
        const cacheKey = prefixes.join();
        let cached = cache.get(cacheKey);
        if (!cached) {
            const resolver = _createResolver(scopes, prefixes);
            cached = {
                resolver,
                subPrefixes: prefixes.filter((p => !p.toLowerCase().includes("hover")))
            };
            cache.set(cacheKey, cached);
        }
        return cached;
    }
    const hasFunction = value => helpers_segment_isObject(value) && Object.getOwnPropertyNames(value).some((key => isFunction(value[key])));
    function needContext(proxy, names) {
        const {isScriptable, isIndexable} = _descriptors(proxy);
        for (const prop of names) {
            const scriptable = isScriptable(prop);
            const indexable = isIndexable(prop);
            const value = (indexable || scriptable) && proxy[prop];
            if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) return true;
        }
        return false;
    }
    var version = "4.4.4";
    const KNOWN_POSITIONS = [ "top", "bottom", "left", "right", "chartArea" ];
    function positionIsHorizontal(position, axis) {
        return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
    }
    function compare2Level(l1, l2) {
        return function(a, b) {
            return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
        };
    }
    function onAnimationsComplete(context) {
        const chart = context.chart;
        const animationOptions = chart.options.animation;
        chart.notifyPlugins("afterRender");
        callback(animationOptions && animationOptions.onComplete, [ context ], chart);
    }
    function onAnimationProgress(context) {
        const chart = context.chart;
        const animationOptions = chart.options.animation;
        callback(animationOptions && animationOptions.onProgress, [ context ], chart);
    }
    function getCanvas(item) {
        if (_isDomSupported() && typeof item === "string") item = document.getElementById(item); else if (item && item.length) item = item[0];
        if (item && item.canvas) item = item.canvas;
        return item;
    }
    const instances = {};
    const getChart = key => {
        const canvas = getCanvas(key);
        return Object.values(instances).filter((c => c.canvas === canvas)).pop();
    };
    function moveNumericKeys(obj, start, move) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            const intKey = +key;
            if (intKey >= start) {
                const value = obj[key];
                delete obj[key];
                if (move > 0 || intKey > start) obj[intKey + move] = value;
            }
        }
    }
    function determineLastEvent(e, lastEvent, inChartArea, isClick) {
        if (!inChartArea || e.type === "mouseout") return null;
        if (isClick) return lastEvent;
        return e;
    }
    function getSizeForArea(scale, chartArea, field) {
        return scale.options.clip ? scale[field] : chartArea[field];
    }
    function getDatasetArea(meta, chartArea) {
        const {xScale, yScale} = meta;
        if (xScale && yScale) return {
            left: getSizeForArea(xScale, chartArea, "left"),
            right: getSizeForArea(xScale, chartArea, "right"),
            top: getSizeForArea(yScale, chartArea, "top"),
            bottom: getSizeForArea(yScale, chartArea, "bottom")
        };
        return chartArea;
    }
    class Chart {
        static defaults=helpers_segment_defaults;
        static instances=instances;
        static overrides=overrides;
        static registry=registry;
        static version=version;
        static getChart=getChart;
        static register(...items) {
            registry.add(...items);
            invalidatePlugins();
        }
        static unregister(...items) {
            registry.remove(...items);
            invalidatePlugins();
        }
        constructor(item, userConfig) {
            const config = this.config = new Config(userConfig);
            const initialCanvas = getCanvas(item);
            const existingChart = getChart(initialCanvas);
            if (existingChart) throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "'" + " must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
            const options = config.createResolver(config.chartOptionScopes(), this.getContext());
            this.platform = new (config.platform || _detectPlatform(initialCanvas));
            this.platform.updateConfig(config);
            const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
            const canvas = context && context.canvas;
            const height = canvas && canvas.height;
            const width = canvas && canvas.width;
            this.id = uid();
            this.ctx = context;
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this._options = options;
            this._aspectRatio = this.aspectRatio;
            this._layers = [];
            this._metasets = [];
            this._stacks = void 0;
            this.boxes = [];
            this.currentDevicePixelRatio = void 0;
            this.chartArea = void 0;
            this._active = [];
            this._lastEvent = void 0;
            this._listeners = {};
            this._responsiveListeners = void 0;
            this._sortedMetasets = [];
            this.scales = {};
            this._plugins = new PluginService;
            this.$proxies = {};
            this._hiddenIndices = {};
            this.attached = false;
            this._animationsDisabled = void 0;
            this.$context = void 0;
            this._doResize = debounce((mode => this.update(mode)), options.resizeDelay || 0);
            this._dataChanges = [];
            instances[this.id] = this;
            if (!context || !canvas) {
                console.error("Failed to create chart: can't acquire context from the given item");
                return;
            }
            animator.listen(this, "complete", onAnimationsComplete);
            animator.listen(this, "progress", onAnimationProgress);
            this._initialize();
            if (this.attached) this.update();
        }
        get aspectRatio() {
            const {options: {aspectRatio, maintainAspectRatio}, width, height, _aspectRatio} = this;
            if (!isNullOrUndef(aspectRatio)) return aspectRatio;
            if (maintainAspectRatio && _aspectRatio) return _aspectRatio;
            return height ? width / height : null;
        }
        get data() {
            return this.config.data;
        }
        set data(data) {
            this.config.data = data;
        }
        get options() {
            return this._options;
        }
        set options(options) {
            this.config.options = options;
        }
        get registry() {
            return registry;
        }
        _initialize() {
            this.notifyPlugins("beforeInit");
            if (this.options.responsive) this.resize(); else retinaScale(this, this.options.devicePixelRatio);
            this.bindEvents();
            this.notifyPlugins("afterInit");
            return this;
        }
        clear() {
            clearCanvas(this.canvas, this.ctx);
            return this;
        }
        stop() {
            animator.stop(this);
            return this;
        }
        resize(width, height) {
            if (!animator.running(this)) this._resize(width, height); else this._resizeBeforeDraw = {
                width,
                height
            };
        }
        _resize(width, height) {
            const options = this.options;
            const canvas = this.canvas;
            const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
            const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
            const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
            const mode = this.width ? "resize" : "attach";
            this.width = newSize.width;
            this.height = newSize.height;
            this._aspectRatio = this.aspectRatio;
            if (!retinaScale(this, newRatio, true)) return;
            this.notifyPlugins("resize", {
                size: newSize
            });
            callback(options.onResize, [ this, newSize ], this);
            if (this.attached) if (this._doResize(mode)) this.render();
        }
        ensureScalesHaveIDs() {
            const options = this.options;
            const scalesOptions = options.scales || {};
            each(scalesOptions, ((axisOptions, axisID) => {
                axisOptions.id = axisID;
            }));
        }
        buildOrUpdateScales() {
            const options = this.options;
            const scaleOpts = options.scales;
            const scales = this.scales;
            const updated = Object.keys(scales).reduce(((obj, id) => {
                obj[id] = false;
                return obj;
            }), {});
            let items = [];
            if (scaleOpts) items = items.concat(Object.keys(scaleOpts).map((id => {
                const scaleOptions = scaleOpts[id];
                const axis = determineAxis(id, scaleOptions);
                const isRadial = axis === "r";
                const isHorizontal = axis === "x";
                return {
                    options: scaleOptions,
                    dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
                    dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
                };
            })));
            each(items, (item => {
                const scaleOptions = item.options;
                const id = scaleOptions.id;
                const axis = determineAxis(id, scaleOptions);
                const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
                if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) scaleOptions.position = item.dposition;
                updated[id] = true;
                let scale = null;
                if (id in scales && scales[id].type === scaleType) scale = scales[id]; else {
                    const scaleClass = registry.getScale(scaleType);
                    scale = new scaleClass({
                        id,
                        type: scaleType,
                        ctx: this.ctx,
                        chart: this
                    });
                    scales[scale.id] = scale;
                }
                scale.init(scaleOptions, options);
            }));
            each(updated, ((hasUpdated, id) => {
                if (!hasUpdated) delete scales[id];
            }));
            each(scales, (scale => {
                layouts.configure(this, scale, scale.options);
                layouts.addBox(this, scale);
            }));
        }
        _updateMetasets() {
            const metasets = this._metasets;
            const numData = this.data.datasets.length;
            const numMeta = metasets.length;
            metasets.sort(((a, b) => a.index - b.index));
            if (numMeta > numData) {
                for (let i = numData; i < numMeta; ++i) this._destroyDatasetMeta(i);
                metasets.splice(numData, numMeta - numData);
            }
            this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
        }
        _removeUnreferencedMetasets() {
            const {_metasets: metasets, data: {datasets}} = this;
            if (metasets.length > datasets.length) delete this._stacks;
            metasets.forEach(((meta, index) => {
                if (datasets.filter((x => x === meta._dataset)).length === 0) this._destroyDatasetMeta(index);
            }));
        }
        buildOrUpdateControllers() {
            const newControllers = [];
            const datasets = this.data.datasets;
            let i, ilen;
            this._removeUnreferencedMetasets();
            for (i = 0, ilen = datasets.length; i < ilen; i++) {
                const dataset = datasets[i];
                let meta = this.getDatasetMeta(i);
                const type = dataset.type || this.config.type;
                if (meta.type && meta.type !== type) {
                    this._destroyDatasetMeta(i);
                    meta = this.getDatasetMeta(i);
                }
                meta.type = type;
                meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
                meta.order = dataset.order || 0;
                meta.index = i;
                meta.label = "" + dataset.label;
                meta.visible = this.isDatasetVisible(i);
                if (meta.controller) {
                    meta.controller.updateIndex(i);
                    meta.controller.linkScales();
                } else {
                    const ControllerClass = registry.getController(type);
                    const {datasetElementType, dataElementType} = helpers_segment_defaults.datasets[type];
                    Object.assign(ControllerClass, {
                        dataElementType: registry.getElement(dataElementType),
                        datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                    });
                    meta.controller = new ControllerClass(this, i);
                    newControllers.push(meta.controller);
                }
            }
            this._updateMetasets();
            return newControllers;
        }
        _resetElements() {
            each(this.data.datasets, ((dataset, datasetIndex) => {
                this.getDatasetMeta(datasetIndex).controller.reset();
            }), this);
        }
        reset() {
            this._resetElements();
            this.notifyPlugins("reset");
        }
        update(mode) {
            const config = this.config;
            config.update();
            const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
            const animsDisabled = this._animationsDisabled = !options.animation;
            this._updateScales();
            this._checkEventBindings();
            this._updateHiddenIndices();
            this._plugins.invalidate();
            if (this.notifyPlugins("beforeUpdate", {
                mode,
                cancelable: true
            }) === false) return;
            const newControllers = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let minPadding = 0;
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
                const {controller} = this.getDatasetMeta(i);
                const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
                controller.buildOrUpdateElements(reset);
                minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
            }
            minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
            this._updateLayout(minPadding);
            if (!animsDisabled) each(newControllers, (controller => {
                controller.reset();
            }));
            this._updateDatasets(mode);
            this.notifyPlugins("afterUpdate", {
                mode
            });
            this._layers.sort(compare2Level("z", "_idx"));
            const {_active, _lastEvent} = this;
            if (_lastEvent) this._eventHandler(_lastEvent, true); else if (_active.length) this._updateHoverStyles(_active, _active, true);
            this.render();
        }
        _updateScales() {
            each(this.scales, (scale => {
                layouts.removeBox(this, scale);
            }));
            this.ensureScalesHaveIDs();
            this.buildOrUpdateScales();
        }
        _checkEventBindings() {
            const options = this.options;
            const existingEvents = new Set(Object.keys(this._listeners));
            const newEvents = new Set(options.events);
            if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
                this.unbindEvents();
                this.bindEvents();
            }
        }
        _updateHiddenIndices() {
            const {_hiddenIndices} = this;
            const changes = this._getUniformDataChanges() || [];
            for (const {method, start, count} of changes) {
                const move = method === "_removeElements" ? -count : count;
                moveNumericKeys(_hiddenIndices, start, move);
            }
        }
        _getUniformDataChanges() {
            const _dataChanges = this._dataChanges;
            if (!_dataChanges || !_dataChanges.length) return;
            this._dataChanges = [];
            const datasetCount = this.data.datasets.length;
            const makeSet = idx => new Set(_dataChanges.filter((c => c[0] === idx)).map(((c, i) => i + "," + c.splice(1).join(","))));
            const changeSet = makeSet(0);
            for (let i = 1; i < datasetCount; i++) if (!setsEqual(changeSet, makeSet(i))) return;
            return Array.from(changeSet).map((c => c.split(","))).map((a => ({
                method: a[1],
                start: +a[2],
                count: +a[3]
            })));
        }
        _updateLayout(minPadding) {
            if (this.notifyPlugins("beforeLayout", {
                cancelable: true
            }) === false) return;
            layouts.update(this, this.width, this.height, minPadding);
            const area = this.chartArea;
            const noArea = area.width <= 0 || area.height <= 0;
            this._layers = [];
            each(this.boxes, (box => {
                if (noArea && box.position === "chartArea") return;
                if (box.configure) box.configure();
                this._layers.push(...box._layers());
            }), this);
            this._layers.forEach(((item, index) => {
                item._idx = index;
            }));
            this.notifyPlugins("afterLayout");
        }
        _updateDatasets(mode) {
            if (this.notifyPlugins("beforeDatasetsUpdate", {
                mode,
                cancelable: true
            }) === false) return;
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this.getDatasetMeta(i).controller.configure();
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._updateDataset(i, isFunction(mode) ? mode({
                datasetIndex: i
            }) : mode);
            this.notifyPlugins("afterDatasetsUpdate", {
                mode
            });
        }
        _updateDataset(index, mode) {
            const meta = this.getDatasetMeta(index);
            const args = {
                meta,
                index,
                mode,
                cancelable: true
            };
            if (this.notifyPlugins("beforeDatasetUpdate", args) === false) return;
            meta.controller._update(mode);
            args.cancelable = false;
            this.notifyPlugins("afterDatasetUpdate", args);
        }
        render() {
            if (this.notifyPlugins("beforeRender", {
                cancelable: true
            }) === false) return;
            if (animator.has(this)) {
                if (this.attached && !animator.running(this)) animator.start(this);
            } else {
                this.draw();
                onAnimationsComplete({
                    chart: this
                });
            }
        }
        draw() {
            let i;
            if (this._resizeBeforeDraw) {
                const {width, height} = this._resizeBeforeDraw;
                this._resizeBeforeDraw = null;
                this._resize(width, height);
            }
            this.clear();
            if (this.width <= 0 || this.height <= 0) return;
            if (this.notifyPlugins("beforeDraw", {
                cancelable: true
            }) === false) return;
            const layers = this._layers;
            for (i = 0; i < layers.length && layers[i].z <= 0; ++i) layers[i].draw(this.chartArea);
            this._drawDatasets();
            for (;i < layers.length; ++i) layers[i].draw(this.chartArea);
            this.notifyPlugins("afterDraw");
        }
        _getSortedDatasetMetas(filterVisible) {
            const metasets = this._sortedMetasets;
            const result = [];
            let i, ilen;
            for (i = 0, ilen = metasets.length; i < ilen; ++i) {
                const meta = metasets[i];
                if (!filterVisible || meta.visible) result.push(meta);
            }
            return result;
        }
        getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(true);
        }
        _drawDatasets() {
            if (this.notifyPlugins("beforeDatasetsDraw", {
                cancelable: true
            }) === false) return;
            const metasets = this.getSortedVisibleDatasetMetas();
            for (let i = metasets.length - 1; i >= 0; --i) this._drawDataset(metasets[i]);
            this.notifyPlugins("afterDatasetsDraw");
        }
        _drawDataset(meta) {
            const ctx = this.ctx;
            const clip = meta._clip;
            const useClip = !clip.disabled;
            const area = getDatasetArea(meta, this.chartArea);
            const args = {
                meta,
                index: meta.index,
                cancelable: true
            };
            if (this.notifyPlugins("beforeDatasetDraw", args) === false) return;
            if (useClip) clipArea(ctx, {
                left: clip.left === false ? 0 : area.left - clip.left,
                right: clip.right === false ? this.width : area.right + clip.right,
                top: clip.top === false ? 0 : area.top - clip.top,
                bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
            });
            meta.controller.draw();
            if (useClip) unclipArea(ctx);
            args.cancelable = false;
            this.notifyPlugins("afterDatasetDraw", args);
        }
        isPointInArea(point) {
            return _isPointInArea(point, this.chartArea, this._minPadding);
        }
        getElementsAtEventForMode(e, mode, options, useFinalPosition) {
            const method = Interaction.modes[mode];
            if (typeof method === "function") return method(this, e, options, useFinalPosition);
            return [];
        }
        getDatasetMeta(datasetIndex) {
            const dataset = this.data.datasets[datasetIndex];
            const metasets = this._metasets;
            let meta = metasets.filter((x => x && x._dataset === dataset)).pop();
            if (!meta) {
                meta = {
                    type: null,
                    data: [],
                    dataset: null,
                    controller: null,
                    hidden: null,
                    xAxisID: null,
                    yAxisID: null,
                    order: dataset && dataset.order || 0,
                    index: datasetIndex,
                    _dataset: dataset,
                    _parsed: [],
                    _sorted: false
                };
                metasets.push(meta);
            }
            return meta;
        }
        getContext() {
            return this.$context || (this.$context = createContext(null, {
                chart: this,
                type: "chart"
            }));
        }
        getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length;
        }
        isDatasetVisible(datasetIndex) {
            const dataset = this.data.datasets[datasetIndex];
            if (!dataset) return false;
            const meta = this.getDatasetMeta(datasetIndex);
            return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
        }
        setDatasetVisibility(datasetIndex, visible) {
            const meta = this.getDatasetMeta(datasetIndex);
            meta.hidden = !visible;
        }
        toggleDataVisibility(index) {
            this._hiddenIndices[index] = !this._hiddenIndices[index];
        }
        getDataVisibility(index) {
            return !this._hiddenIndices[index];
        }
        _updateVisibility(datasetIndex, dataIndex, visible) {
            const mode = visible ? "show" : "hide";
            const meta = this.getDatasetMeta(datasetIndex);
            const anims = meta.controller._resolveAnimations(void 0, mode);
            if (defined(dataIndex)) {
                meta.data[dataIndex].hidden = !visible;
                this.update();
            } else {
                this.setDatasetVisibility(datasetIndex, visible);
                anims.update(meta, {
                    visible
                });
                this.update((ctx => ctx.datasetIndex === datasetIndex ? mode : void 0));
            }
        }
        hide(datasetIndex, dataIndex) {
            this._updateVisibility(datasetIndex, dataIndex, false);
        }
        show(datasetIndex, dataIndex) {
            this._updateVisibility(datasetIndex, dataIndex, true);
        }
        _destroyDatasetMeta(datasetIndex) {
            const meta = this._metasets[datasetIndex];
            if (meta && meta.controller) meta.controller._destroy();
            delete this._metasets[datasetIndex];
        }
        _stop() {
            let i, ilen;
            this.stop();
            animator.remove(this);
            for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._destroyDatasetMeta(i);
        }
        destroy() {
            this.notifyPlugins("beforeDestroy");
            const {canvas, ctx} = this;
            this._stop();
            this.config.clearCache();
            if (canvas) {
                this.unbindEvents();
                clearCanvas(canvas, ctx);
                this.platform.releaseContext(ctx);
                this.canvas = null;
                this.ctx = null;
            }
            delete instances[this.id];
            this.notifyPlugins("afterDestroy");
        }
        toBase64Image(...args) {
            return this.canvas.toDataURL(...args);
        }
        bindEvents() {
            this.bindUserEvents();
            if (this.options.responsive) this.bindResponsiveEvents(); else this.attached = true;
        }
        bindUserEvents() {
            const listeners = this._listeners;
            const platform = this.platform;
            const _add = (type, listener) => {
                platform.addEventListener(this, type, listener);
                listeners[type] = listener;
            };
            const listener = (e, x, y) => {
                e.offsetX = x;
                e.offsetY = y;
                this._eventHandler(e);
            };
            each(this.options.events, (type => _add(type, listener)));
        }
        bindResponsiveEvents() {
            if (!this._responsiveListeners) this._responsiveListeners = {};
            const listeners = this._responsiveListeners;
            const platform = this.platform;
            const _add = (type, listener) => {
                platform.addEventListener(this, type, listener);
                listeners[type] = listener;
            };
            const _remove = (type, listener) => {
                if (listeners[type]) {
                    platform.removeEventListener(this, type, listener);
                    delete listeners[type];
                }
            };
            const listener = (width, height) => {
                if (this.canvas) this.resize(width, height);
            };
            let detached;
            const attached = () => {
                _remove("attach", attached);
                this.attached = true;
                this.resize();
                _add("resize", listener);
                _add("detach", detached);
            };
            detached = () => {
                this.attached = false;
                _remove("resize", listener);
                this._stop();
                this._resize(0, 0);
                _add("attach", attached);
            };
            if (platform.isAttached(this.canvas)) attached(); else detached();
        }
        unbindEvents() {
            each(this._listeners, ((listener, type) => {
                this.platform.removeEventListener(this, type, listener);
            }));
            this._listeners = {};
            each(this._responsiveListeners, ((listener, type) => {
                this.platform.removeEventListener(this, type, listener);
            }));
            this._responsiveListeners = void 0;
        }
        updateHoverStyle(items, mode, enabled) {
            const prefix = enabled ? "set" : "remove";
            let meta, item, i, ilen;
            if (mode === "dataset") {
                meta = this.getDatasetMeta(items[0].datasetIndex);
                meta.controller["_" + prefix + "DatasetHoverStyle"]();
            }
            for (i = 0, ilen = items.length; i < ilen; ++i) {
                item = items[i];
                const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
                if (controller) controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
            }
        }
        getActiveElements() {
            return this._active || [];
        }
        setActiveElements(activeElements) {
            const lastActive = this._active || [];
            const active = activeElements.map((({datasetIndex, index}) => {
                const meta = this.getDatasetMeta(datasetIndex);
                if (!meta) throw new Error("No dataset found at index " + datasetIndex);
                return {
                    datasetIndex,
                    element: meta.data[index],
                    index
                };
            }));
            const changed = !_elementsEqual(active, lastActive);
            if (changed) {
                this._active = active;
                this._lastEvent = null;
                this._updateHoverStyles(active, lastActive);
            }
        }
        notifyPlugins(hook, args, filter) {
            return this._plugins.notify(this, hook, args, filter);
        }
        isPluginEnabled(pluginId) {
            return this._plugins._cache.filter((p => p.plugin.id === pluginId)).length === 1;
        }
        _updateHoverStyles(active, lastActive, replay) {
            const hoverOptions = this.options.hover;
            const diff = (a, b) => a.filter((x => !b.some((y => x.datasetIndex === y.datasetIndex && x.index === y.index))));
            const deactivated = diff(lastActive, active);
            const activated = replay ? active : diff(active, lastActive);
            if (deactivated.length) this.updateHoverStyle(deactivated, hoverOptions.mode, false);
            if (activated.length && hoverOptions.mode) this.updateHoverStyle(activated, hoverOptions.mode, true);
        }
        _eventHandler(e, replay) {
            const args = {
                event: e,
                replay,
                cancelable: true,
                inChartArea: this.isPointInArea(e)
            };
            const eventFilter = plugin => (plugin.options.events || this.options.events).includes(e.native.type);
            if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) return;
            const changed = this._handleEvent(e, replay, args.inChartArea);
            args.cancelable = false;
            this.notifyPlugins("afterEvent", args, eventFilter);
            if (changed || args.changed) this.render();
            return this;
        }
        _handleEvent(e, replay, inChartArea) {
            const {_active: lastActive = [], options} = this;
            const useFinalPosition = replay;
            const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
            const isClick = _isClickEvent(e);
            const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
            if (inChartArea) {
                this._lastEvent = null;
                callback(options.onHover, [ e, active, this ], this);
                if (isClick) callback(options.onClick, [ e, active, this ], this);
            }
            const changed = !_elementsEqual(active, lastActive);
            if (changed || replay) {
                this._active = active;
                this._updateHoverStyles(active, lastActive, replay);
            }
            this._lastEvent = lastEvent;
            return changed;
        }
        _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
            if (e.type === "mouseout") return [];
            if (!inChartArea) return lastActive;
            const hoverOptions = this.options.hover;
            return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
        }
    }
    function invalidatePlugins() {
        return each(Chart.instances, (chart => chart._plugins.invalidate()));
    }
    function clipArc(ctx, element, endAngle) {
        const {startAngle, pixelMargin, x, y, outerRadius, innerRadius} = element;
        let angleMargin = pixelMargin / outerRadius;
        ctx.beginPath();
        ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
        if (innerRadius > pixelMargin) {
            angleMargin = pixelMargin / innerRadius;
            ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
        } else ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
        ctx.closePath();
        ctx.clip();
    }
    function toRadiusCorners(value) {
        return _readValueToProps(value, [ "outerStart", "outerEnd", "innerStart", "innerEnd" ]);
    }
    function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
        const o = toRadiusCorners(arc.options.borderRadius);
        const halfThickness = (outerRadius - innerRadius) / 2;
        const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
        const computeOuterLimit = val => {
            const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
            return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
        };
        return {
            outerStart: computeOuterLimit(o.outerStart),
            outerEnd: computeOuterLimit(o.outerEnd),
            innerStart: _limitValue(o.innerStart, 0, innerLimit),
            innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
        };
    }
    function rThetaToXY(r, theta, x, y) {
        return {
            x: x + r * Math.cos(theta),
            y: y + r * Math.sin(theta)
        };
    }
    function pathArc(ctx, element, offset, spacing, end, circular) {
        const {x, y, startAngle: start, pixelMargin, innerRadius: innerR} = element;
        const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
        const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
        let spacingOffset = 0;
        const alpha = end - start;
        if (spacing) {
            const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
            const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
            const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
            const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
            spacingOffset = (alpha - adjustedAngle) / 2;
        }
        const beta = Math.max(.001, alpha * outerRadius - offset / PI) / outerRadius;
        const angleOffset = (alpha - beta) / 2;
        const startAngle = start + angleOffset + spacingOffset;
        const endAngle = end - angleOffset - spacingOffset;
        const {outerStart, outerEnd, innerStart, innerEnd} = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
        const outerStartAdjustedRadius = outerRadius - outerStart;
        const outerEndAdjustedRadius = outerRadius - outerEnd;
        const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
        const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
        const innerStartAdjustedRadius = innerRadius + innerStart;
        const innerEndAdjustedRadius = innerRadius + innerEnd;
        const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
        const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
        ctx.beginPath();
        if (circular) {
            const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
            ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
            ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
            if (outerEnd > 0) {
                const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
            }
            const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
            ctx.lineTo(p4.x, p4.y);
            if (innerEnd > 0) {
                const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
            }
            const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
            ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
            ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
            if (innerStart > 0) {
                const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
            }
            const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
            ctx.lineTo(p8.x, p8.y);
            if (outerStart > 0) {
                const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
            }
        } else {
            ctx.moveTo(x, y);
            const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
            const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
            ctx.lineTo(outerStartX, outerStartY);
            const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
            const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
            ctx.lineTo(outerEndX, outerEndY);
        }
        ctx.closePath();
    }
    function drawArc(ctx, element, offset, spacing, circular) {
        const {fullCircles, startAngle, circumference} = element;
        let endAngle = element.endAngle;
        if (fullCircles) {
            pathArc(ctx, element, offset, spacing, endAngle, circular);
            for (let i = 0; i < fullCircles; ++i) ctx.fill();
            if (!isNaN(circumference)) endAngle = startAngle + (circumference % TAU || TAU);
        }
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        ctx.fill();
        return endAngle;
    }
    function drawBorder(ctx, element, offset, spacing, circular) {
        const {fullCircles, startAngle, circumference, options} = element;
        const {borderWidth, borderJoinStyle, borderDash, borderDashOffset} = options;
        const inner = options.borderAlign === "inner";
        if (!borderWidth) return;
        ctx.setLineDash(borderDash || []);
        ctx.lineDashOffset = borderDashOffset;
        if (inner) {
            ctx.lineWidth = borderWidth * 2;
            ctx.lineJoin = borderJoinStyle || "round";
        } else {
            ctx.lineWidth = borderWidth;
            ctx.lineJoin = borderJoinStyle || "bevel";
        }
        let endAngle = element.endAngle;
        if (fullCircles) {
            pathArc(ctx, element, offset, spacing, endAngle, circular);
            for (let i = 0; i < fullCircles; ++i) ctx.stroke();
            if (!isNaN(circumference)) endAngle = startAngle + (circumference % TAU || TAU);
        }
        if (inner) clipArc(ctx, element, endAngle);
        if (!fullCircles) {
            pathArc(ctx, element, offset, spacing, endAngle, circular);
            ctx.stroke();
        }
    }
    class ArcElement extends Element {
        static id="arc";
        static defaults={
            borderAlign: "center",
            borderColor: "#fff",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: void 0,
            borderRadius: 0,
            borderWidth: 2,
            offset: 0,
            spacing: 0,
            angle: void 0,
            circular: true
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor"
        };
        static descriptors={
            _scriptable: true,
            _indexable: name => name !== "borderDash"
        };
        circumference;
        endAngle;
        fullCircles;
        innerRadius;
        outerRadius;
        pixelMargin;
        startAngle;
        constructor(cfg) {
            super();
            this.options = void 0;
            this.circumference = void 0;
            this.startAngle = void 0;
            this.endAngle = void 0;
            this.innerRadius = void 0;
            this.outerRadius = void 0;
            this.pixelMargin = 0;
            this.fullCircles = 0;
            if (cfg) Object.assign(this, cfg);
        }
        inRange(chartX, chartY, useFinalPosition) {
            const point = this.getProps([ "x", "y" ], useFinalPosition);
            const {angle, distance} = getAngleFromPoint(point, {
                x: chartX,
                y: chartY
            });
            const {startAngle, endAngle, innerRadius, outerRadius, circumference} = this.getProps([ "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference" ], useFinalPosition);
            const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
            const _circumference = valueOrDefault(circumference, endAngle - startAngle);
            const nonZeroBetween = _angleBetween(angle, startAngle, endAngle) && startAngle !== endAngle;
            const betweenAngles = _circumference >= TAU || nonZeroBetween;
            const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
            return betweenAngles && withinRadius;
        }
        getCenterPoint(useFinalPosition) {
            const {x, y, startAngle, endAngle, innerRadius, outerRadius} = this.getProps([ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius" ], useFinalPosition);
            const {offset, spacing} = this.options;
            const halfAngle = (startAngle + endAngle) / 2;
            const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
            return {
                x: x + Math.cos(halfAngle) * halfRadius,
                y: y + Math.sin(halfAngle) * halfRadius
            };
        }
        tooltipPosition(useFinalPosition) {
            return this.getCenterPoint(useFinalPosition);
        }
        draw(ctx) {
            const {options, circumference} = this;
            const offset = (options.offset || 0) / 4;
            const spacing = (options.spacing || 0) / 2;
            const circular = options.circular;
            this.pixelMargin = options.borderAlign === "inner" ? .33 : 0;
            this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
            if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
            ctx.save();
            const halfAngle = (this.startAngle + this.endAngle) / 2;
            ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
            const fix = 1 - Math.sin(Math.min(PI, circumference || 0));
            const radiusOffset = offset * fix;
            ctx.fillStyle = options.backgroundColor;
            ctx.strokeStyle = options.borderColor;
            drawArc(ctx, this, radiusOffset, spacing, circular);
            drawBorder(ctx, this, radiusOffset, spacing, circular);
            ctx.restore();
        }
    }
    function setStyle(ctx, options, style = options) {
        ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
        ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
        ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
        ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
        ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
        ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
    }
    function lineTo(ctx, previous, target) {
        ctx.lineTo(target.x, target.y);
    }
    function getLineMethod(options) {
        if (options.stepped) return _steppedLineTo;
        if (options.tension || options.cubicInterpolationMode === "monotone") return _bezierCurveTo;
        return lineTo;
    }
    function pathVars(points, segment, params = {}) {
        const count = points.length;
        const {start: paramsStart = 0, end: paramsEnd = count - 1} = params;
        const {start: segmentStart, end: segmentEnd} = segment;
        const start = Math.max(paramsStart, segmentStart);
        const end = Math.min(paramsEnd, segmentEnd);
        const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
        return {
            count,
            start,
            loop: segment.loop,
            ilen: end < start && !outside ? count + end - start : end - start
        };
    }
    function pathSegment(ctx, line, segment, params) {
        const {points, options} = line;
        const {count, start, loop, ilen} = pathVars(points, segment, params);
        const lineMethod = getLineMethod(options);
        let {move = true, reverse} = params || {};
        let i, point, prev;
        for (i = 0; i <= ilen; ++i) {
            point = points[(start + (reverse ? ilen - i : i)) % count];
            if (point.skip) continue; else if (move) {
                ctx.moveTo(point.x, point.y);
                move = false;
            } else lineMethod(ctx, prev, point, reverse, options.stepped);
            prev = point;
        }
        if (loop) {
            point = points[(start + (reverse ? ilen : 0)) % count];
            lineMethod(ctx, prev, point, reverse, options.stepped);
        }
        return !!loop;
    }
    function fastPathSegment(ctx, line, segment, params) {
        const points = line.points;
        const {count, start, ilen} = pathVars(points, segment, params);
        const {move = true, reverse} = params || {};
        let avgX = 0;
        let countX = 0;
        let i, point, prevX, minY, maxY, lastY;
        const pointIndex = index => (start + (reverse ? ilen - index : index)) % count;
        const drawX = () => {
            if (minY !== maxY) {
                ctx.lineTo(avgX, maxY);
                ctx.lineTo(avgX, minY);
                ctx.lineTo(avgX, lastY);
            }
        };
        if (move) {
            point = points[pointIndex(0)];
            ctx.moveTo(point.x, point.y);
        }
        for (i = 0; i <= ilen; ++i) {
            point = points[pointIndex(i)];
            if (point.skip) continue;
            const x = point.x;
            const y = point.y;
            const truncX = x | 0;
            if (truncX === prevX) {
                if (y < minY) minY = y; else if (y > maxY) maxY = y;
                avgX = (countX * avgX + x) / ++countX;
            } else {
                drawX();
                ctx.lineTo(x, y);
                prevX = truncX;
                countX = 0;
                minY = maxY = y;
            }
            lastY = y;
        }
        drawX();
    }
    function _getSegmentMethod(line) {
        const opts = line.options;
        const borderDash = opts.borderDash && opts.borderDash.length;
        const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
        return useFastPath ? fastPathSegment : pathSegment;
    }
    function _getInterpolationMethod(options) {
        if (options.stepped) return _steppedInterpolation;
        if (options.tension || options.cubicInterpolationMode === "monotone") return _bezierInterpolation;
        return _pointInLine;
    }
    function strokePathWithCache(ctx, line, start, count) {
        let path = line._path;
        if (!path) {
            path = line._path = new Path2D;
            if (line.path(path, start, count)) path.closePath();
        }
        setStyle(ctx, line.options);
        ctx.stroke(path);
    }
    function strokePathDirect(ctx, line, start, count) {
        const {segments, options} = line;
        const segmentMethod = _getSegmentMethod(line);
        for (const segment of segments) {
            setStyle(ctx, options, segment.style);
            ctx.beginPath();
            if (segmentMethod(ctx, line, segment, {
                start,
                end: start + count - 1
            })) ctx.closePath();
            ctx.stroke();
        }
    }
    const usePath2D = typeof Path2D === "function";
    function draw(ctx, line, start, count) {
        if (usePath2D && !line.options.segment) strokePathWithCache(ctx, line, start, count); else strokePathDirect(ctx, line, start, count);
    }
    class LineElement extends Element {
        static id="line";
        static defaults={
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 3,
            capBezierPoints: true,
            cubicInterpolationMode: "default",
            fill: false,
            spanGaps: false,
            stepped: false,
            tension: 0
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        static descriptors={
            _scriptable: true,
            _indexable: name => name !== "borderDash" && name !== "fill"
        };
        constructor(cfg) {
            super();
            this.animated = true;
            this.options = void 0;
            this._chart = void 0;
            this._loop = void 0;
            this._fullLoop = void 0;
            this._path = void 0;
            this._points = void 0;
            this._segments = void 0;
            this._decimated = false;
            this._pointsUpdated = false;
            this._datasetIndex = void 0;
            if (cfg) Object.assign(this, cfg);
        }
        updateControlPoints(chartArea, indexAxis) {
            const options = this.options;
            if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
                const loop = options.spanGaps ? this._loop : this._fullLoop;
                _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
                this._pointsUpdated = true;
            }
        }
        set points(points) {
            this._points = points;
            delete this._segments;
            delete this._path;
            this._pointsUpdated = false;
        }
        get points() {
            return this._points;
        }
        get segments() {
            return this._segments || (this._segments = _computeSegments(this, this.options.segment));
        }
        first() {
            const segments = this.segments;
            const points = this.points;
            return segments.length && points[segments[0].start];
        }
        last() {
            const segments = this.segments;
            const points = this.points;
            const count = segments.length;
            return count && points[segments[count - 1].end];
        }
        interpolate(point, property) {
            const options = this.options;
            const value = point[property];
            const points = this.points;
            const segments = _boundSegments(this, {
                property,
                start: value,
                end: value
            });
            if (!segments.length) return;
            const result = [];
            const _interpolate = _getInterpolationMethod(options);
            let i, ilen;
            for (i = 0, ilen = segments.length; i < ilen; ++i) {
                const {start, end} = segments[i];
                const p1 = points[start];
                const p2 = points[end];
                if (p1 === p2) {
                    result.push(p1);
                    continue;
                }
                const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
                const interpolated = _interpolate(p1, p2, t, options.stepped);
                interpolated[property] = point[property];
                result.push(interpolated);
            }
            return result.length === 1 ? result[0] : result;
        }
        pathSegment(ctx, segment, params) {
            const segmentMethod = _getSegmentMethod(this);
            return segmentMethod(ctx, this, segment, params);
        }
        path(ctx, start, count) {
            const segments = this.segments;
            const segmentMethod = _getSegmentMethod(this);
            let loop = this._loop;
            start = start || 0;
            count = count || this.points.length - start;
            for (const segment of segments) loop &= segmentMethod(ctx, this, segment, {
                start,
                end: start + count - 1
            });
            return !!loop;
        }
        draw(ctx, chartArea, start, count) {
            const options = this.options || {};
            const points = this.points || [];
            if (points.length && options.borderWidth) {
                ctx.save();
                draw(ctx, this, start, count);
                ctx.restore();
            }
            if (this.animated) {
                this._pointsUpdated = false;
                this._path = void 0;
            }
        }
    }
    function inRange$1(el, pos, axis, useFinalPosition) {
        const options = el.options;
        const {[axis]: value} = el.getProps([ axis ], useFinalPosition);
        return Math.abs(pos - value) < options.radius + options.hitRadius;
    }
    class PointElement extends Element {
        static id="point";
        parsed;
        skip;
        stop;
        static defaults={
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: "circle",
            radius: 3,
            rotation: 0
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        constructor(cfg) {
            super();
            this.options = void 0;
            this.parsed = void 0;
            this.skip = void 0;
            this.stop = void 0;
            if (cfg) Object.assign(this, cfg);
        }
        inRange(mouseX, mouseY, useFinalPosition) {
            const options = this.options;
            const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
            return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
        }
        inXRange(mouseX, useFinalPosition) {
            return inRange$1(this, mouseX, "x", useFinalPosition);
        }
        inYRange(mouseY, useFinalPosition) {
            return inRange$1(this, mouseY, "y", useFinalPosition);
        }
        getCenterPoint(useFinalPosition) {
            const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
            return {
                x,
                y
            };
        }
        size(options) {
            options = options || this.options || {};
            let radius = options.radius || 0;
            radius = Math.max(radius, radius && options.hoverRadius || 0);
            const borderWidth = radius && options.borderWidth || 0;
            return (radius + borderWidth) * 2;
        }
        draw(ctx, area) {
            const options = this.options;
            if (this.skip || options.radius < .1 || !_isPointInArea(this, area, this.size(options) / 2)) return;
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.fillStyle = options.backgroundColor;
            drawPoint(ctx, options, this.x, this.y);
        }
        getRange() {
            const options = this.options || {};
            return options.radius + options.hitRadius;
        }
    }
    function getBarBounds(bar, useFinalPosition) {
        const {x, y, base, width, height} = bar.getProps([ "x", "y", "base", "width", "height" ], useFinalPosition);
        let left, right, top, bottom, half;
        if (bar.horizontal) {
            half = height / 2;
            left = Math.min(x, base);
            right = Math.max(x, base);
            top = y - half;
            bottom = y + half;
        } else {
            half = width / 2;
            left = x - half;
            right = x + half;
            top = Math.min(y, base);
            bottom = Math.max(y, base);
        }
        return {
            left,
            top,
            right,
            bottom
        };
    }
    function skipOrLimit(skip, value, min, max) {
        return skip ? 0 : _limitValue(value, min, max);
    }
    function parseBorderWidth(bar, maxW, maxH) {
        const value = bar.options.borderWidth;
        const skip = bar.borderSkipped;
        const o = toTRBL(value);
        return {
            t: skipOrLimit(skip.top, o.top, 0, maxH),
            r: skipOrLimit(skip.right, o.right, 0, maxW),
            b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
            l: skipOrLimit(skip.left, o.left, 0, maxW)
        };
    }
    function parseBorderRadius(bar, maxW, maxH) {
        const {enableBorderRadius} = bar.getProps([ "enableBorderRadius" ]);
        const value = bar.options.borderRadius;
        const o = toTRBLCorners(value);
        const maxR = Math.min(maxW, maxH);
        const skip = bar.borderSkipped;
        const enableBorder = enableBorderRadius || helpers_segment_isObject(value);
        return {
            topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
            topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
            bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
            bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
        };
    }
    function boundingRects(bar) {
        const bounds = getBarBounds(bar);
        const width = bounds.right - bounds.left;
        const height = bounds.bottom - bounds.top;
        const border = parseBorderWidth(bar, width / 2, height / 2);
        const radius = parseBorderRadius(bar, width / 2, height / 2);
        return {
            outer: {
                x: bounds.left,
                y: bounds.top,
                w: width,
                h: height,
                radius
            },
            inner: {
                x: bounds.left + border.l,
                y: bounds.top + border.t,
                w: width - border.l - border.r,
                h: height - border.t - border.b,
                radius: {
                    topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                    topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                    bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                    bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
                }
            }
        };
    }
    function inRange(bar, x, y, useFinalPosition) {
        const skipX = x === null;
        const skipY = y === null;
        const skipBoth = skipX && skipY;
        const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
        return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
    }
    function hasRadius(radius) {
        return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
    }
    function addNormalRectPath(ctx, rect) {
        ctx.rect(rect.x, rect.y, rect.w, rect.h);
    }
    function inflateRect(rect, amount, refRect = {}) {
        const x = rect.x !== refRect.x ? -amount : 0;
        const y = rect.y !== refRect.y ? -amount : 0;
        const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
        const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
        return {
            x: rect.x + x,
            y: rect.y + y,
            w: rect.w + w,
            h: rect.h + h,
            radius: rect.radius
        };
    }
    class BarElement extends Element {
        static id="bar";
        static defaults={
            borderSkipped: "start",
            borderWidth: 0,
            borderRadius: 0,
            inflateAmount: "auto",
            pointStyle: void 0
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        constructor(cfg) {
            super();
            this.options = void 0;
            this.horizontal = void 0;
            this.base = void 0;
            this.width = void 0;
            this.height = void 0;
            this.inflateAmount = void 0;
            if (cfg) Object.assign(this, cfg);
        }
        draw(ctx) {
            const {inflateAmount, options: {borderColor, backgroundColor}} = this;
            const {inner, outer} = boundingRects(this);
            const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
            ctx.save();
            if (outer.w !== inner.w || outer.h !== inner.h) {
                ctx.beginPath();
                addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
                ctx.clip();
                addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
                ctx.fillStyle = borderColor;
                ctx.fill("evenodd");
            }
            ctx.beginPath();
            addRectPath(ctx, inflateRect(inner, inflateAmount));
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
        }
        inRange(mouseX, mouseY, useFinalPosition) {
            return inRange(this, mouseX, mouseY, useFinalPosition);
        }
        inXRange(mouseX, useFinalPosition) {
            return inRange(this, mouseX, null, useFinalPosition);
        }
        inYRange(mouseY, useFinalPosition) {
            return inRange(this, null, mouseY, useFinalPosition);
        }
        getCenterPoint(useFinalPosition) {
            const {x, y, base, horizontal} = this.getProps([ "x", "y", "base", "horizontal" ], useFinalPosition);
            return {
                x: horizontal ? (x + base) / 2 : x,
                y: horizontal ? y : (y + base) / 2
            };
        }
        getRange(axis) {
            return axis === "x" ? this.width / 2 : this.height / 2;
        }
    }
    var chart_elements = Object.freeze({
        __proto__: null,
        ArcElement,
        BarElement,
        LineElement,
        PointElement
    });
    const BORDER_COLORS = [ "rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(201, 203, 207)" ];
    const BACKGROUND_COLORS = BORDER_COLORS.map((color => color.replace("rgb(", "rgba(").replace(")", ", 0.5)")));
    function getBorderColor(i) {
        return BORDER_COLORS[i % BORDER_COLORS.length];
    }
    function getBackgroundColor(i) {
        return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
    }
    function colorizeDefaultDataset(dataset, i) {
        dataset.borderColor = getBorderColor(i);
        dataset.backgroundColor = getBackgroundColor(i);
        return ++i;
    }
    function colorizeDoughnutDataset(dataset, i) {
        dataset.backgroundColor = dataset.data.map((() => getBorderColor(i++)));
        return i;
    }
    function colorizePolarAreaDataset(dataset, i) {
        dataset.backgroundColor = dataset.data.map((() => getBackgroundColor(i++)));
        return i;
    }
    function getColorizer(chart) {
        let i = 0;
        return (dataset, datasetIndex) => {
            const controller = chart.getDatasetMeta(datasetIndex).controller;
            if (controller instanceof DoughnutController) i = colorizeDoughnutDataset(dataset, i); else if (controller instanceof PolarAreaController) i = colorizePolarAreaDataset(dataset, i); else if (controller) i = colorizeDefaultDataset(dataset, i);
        };
    }
    function containsColorsDefinitions(descriptors) {
        let k;
        for (k in descriptors) if (descriptors[k].borderColor || descriptors[k].backgroundColor) return true;
        return false;
    }
    function containsColorsDefinition(descriptor) {
        return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
    }
    var plugin_colors = {
        id: "colors",
        defaults: {
            enabled: true,
            forceOverride: false
        },
        beforeLayout(chart, _args, options) {
            if (!options.enabled) return;
            const {data: {datasets}, options: chartOptions} = chart.config;
            const {elements} = chartOptions;
            if (!options.forceOverride && (containsColorsDefinitions(datasets) || containsColorsDefinition(chartOptions) || elements && containsColorsDefinitions(elements))) return;
            const colorizer = getColorizer(chart);
            datasets.forEach(colorizer);
        }
    };
    function lttbDecimation(data, start, count, availableWidth, options) {
        const samples = options.samples || availableWidth;
        if (samples >= count) return data.slice(start, start + count);
        const decimated = [];
        const bucketWidth = (count - 2) / (samples - 2);
        let sampledIndex = 0;
        const endIndex = start + count - 1;
        let a = start;
        let i, maxAreaPoint, maxArea, area, nextA;
        decimated[sampledIndex++] = data[a];
        for (i = 0; i < samples - 2; i++) {
            let avgX = 0;
            let avgY = 0;
            let j;
            const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
            const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
            const avgRangeLength = avgRangeEnd - avgRangeStart;
            for (j = avgRangeStart; j < avgRangeEnd; j++) {
                avgX += data[j].x;
                avgY += data[j].y;
            }
            avgX /= avgRangeLength;
            avgY /= avgRangeLength;
            const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
            const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
            const {x: pointAx, y: pointAy} = data[a];
            maxArea = area = -1;
            for (j = rangeOffs; j < rangeTo; j++) {
                area = .5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
                if (area > maxArea) {
                    maxArea = area;
                    maxAreaPoint = data[j];
                    nextA = j;
                }
            }
            decimated[sampledIndex++] = maxAreaPoint;
            a = nextA;
        }
        decimated[sampledIndex++] = data[endIndex];
        return decimated;
    }
    function minMaxDecimation(data, start, count, availableWidth) {
        let avgX = 0;
        let countX = 0;
        let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
        const decimated = [];
        const endIndex = start + count - 1;
        const xMin = data[start].x;
        const xMax = data[endIndex].x;
        const dx = xMax - xMin;
        for (i = start; i < start + count; ++i) {
            point = data[i];
            x = (point.x - xMin) / dx * availableWidth;
            y = point.y;
            const truncX = x | 0;
            if (truncX === prevX) {
                if (y < minY) {
                    minY = y;
                    minIndex = i;
                } else if (y > maxY) {
                    maxY = y;
                    maxIndex = i;
                }
                avgX = (countX * avgX + point.x) / ++countX;
            } else {
                const lastIndex = i - 1;
                if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
                    const intermediateIndex1 = Math.min(minIndex, maxIndex);
                    const intermediateIndex2 = Math.max(minIndex, maxIndex);
                    if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) decimated.push({
                        ...data[intermediateIndex1],
                        x: avgX
                    });
                    if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) decimated.push({
                        ...data[intermediateIndex2],
                        x: avgX
                    });
                }
                if (i > 0 && lastIndex !== startIndex) decimated.push(data[lastIndex]);
                decimated.push(point);
                prevX = truncX;
                countX = 0;
                minY = maxY = y;
                minIndex = maxIndex = startIndex = i;
            }
        }
        return decimated;
    }
    function cleanDecimatedDataset(dataset) {
        if (dataset._decimated) {
            const data = dataset._data;
            delete dataset._decimated;
            delete dataset._data;
            Object.defineProperty(dataset, "data", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: data
            });
        }
    }
    function cleanDecimatedData(chart) {
        chart.data.datasets.forEach((dataset => {
            cleanDecimatedDataset(dataset);
        }));
    }
    function getStartAndCountOfVisiblePointsSimplified(meta, points) {
        const pointCount = points.length;
        let start = 0;
        let count;
        const {iScale} = meta;
        const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
        if (minDefined) start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
        if (maxDefined) count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start; else count = pointCount - start;
        return {
            start,
            count
        };
    }
    var plugin_decimation = {
        id: "decimation",
        defaults: {
            algorithm: "min-max",
            enabled: false
        },
        beforeElementsUpdate: (chart, args, options) => {
            if (!options.enabled) {
                cleanDecimatedData(chart);
                return;
            }
            const availableWidth = chart.width;
            chart.data.datasets.forEach(((dataset, datasetIndex) => {
                const {_data, indexAxis} = dataset;
                const meta = chart.getDatasetMeta(datasetIndex);
                const data = _data || dataset.data;
                if (resolve([ indexAxis, chart.options.indexAxis ]) === "y") return;
                if (!meta.controller.supportsDecimation) return;
                const xAxis = chart.scales[meta.xAxisID];
                if (xAxis.type !== "linear" && xAxis.type !== "time") return;
                if (chart.options.parsing) return;
                let {start, count} = getStartAndCountOfVisiblePointsSimplified(meta, data);
                const threshold = options.threshold || 4 * availableWidth;
                if (count <= threshold) {
                    cleanDecimatedDataset(dataset);
                    return;
                }
                if (isNullOrUndef(_data)) {
                    dataset._data = data;
                    delete dataset.data;
                    Object.defineProperty(dataset, "data", {
                        configurable: true,
                        enumerable: true,
                        get: function() {
                            return this._decimated;
                        },
                        set: function(d) {
                            this._data = d;
                        }
                    });
                }
                let decimated;
                switch (options.algorithm) {
                  case "lttb":
                    decimated = lttbDecimation(data, start, count, availableWidth, options);
                    break;

                  case "min-max":
                    decimated = minMaxDecimation(data, start, count, availableWidth);
                    break;

                  default:
                    throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
                }
                dataset._decimated = decimated;
            }));
        },
        destroy(chart) {
            cleanDecimatedData(chart);
        }
    };
    function _segments(line, target, property) {
        const segments = line.segments;
        const points = line.points;
        const tpoints = target.points;
        const parts = [];
        for (const segment of segments) {
            let {start, end} = segment;
            end = _findSegmentEnd(start, end, points);
            const bounds = _getBounds(property, points[start], points[end], segment.loop);
            if (!target.segments) {
                parts.push({
                    source: segment,
                    target: bounds,
                    start: points[start],
                    end: points[end]
                });
                continue;
            }
            const targetSegments = _boundSegments(target, bounds);
            for (const tgt of targetSegments) {
                const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
                const fillSources = _boundSegment(segment, points, subBounds);
                for (const fillSource of fillSources) parts.push({
                    source: fillSource,
                    target: tgt,
                    start: {
                        [property]: _getEdge(bounds, subBounds, "start", Math.max)
                    },
                    end: {
                        [property]: _getEdge(bounds, subBounds, "end", Math.min)
                    }
                });
            }
        }
        return parts;
    }
    function _getBounds(property, first, last, loop) {
        if (loop) return;
        let start = first[property];
        let end = last[property];
        if (property === "angle") {
            start = _normalizeAngle(start);
            end = _normalizeAngle(end);
        }
        return {
            property,
            start,
            end
        };
    }
    function _pointsFromSegments(boundary, line) {
        const {x = null, y = null} = boundary || {};
        const linePoints = line.points;
        const points = [];
        line.segments.forEach((({start, end}) => {
            end = _findSegmentEnd(start, end, linePoints);
            const first = linePoints[start];
            const last = linePoints[end];
            if (y !== null) {
                points.push({
                    x: first.x,
                    y
                });
                points.push({
                    x: last.x,
                    y
                });
            } else if (x !== null) {
                points.push({
                    x,
                    y: first.y
                });
                points.push({
                    x,
                    y: last.y
                });
            }
        }));
        return points;
    }
    function _findSegmentEnd(start, end, points) {
        for (;end > start; end--) {
            const point = points[end];
            if (!isNaN(point.x) && !isNaN(point.y)) break;
        }
        return end;
    }
    function _getEdge(a, b, prop, fn) {
        if (a && b) return fn(a[prop], b[prop]);
        return a ? a[prop] : b ? b[prop] : 0;
    }
    function _createBoundaryLine(boundary, line) {
        let points = [];
        let _loop = false;
        if (isArray(boundary)) {
            _loop = true;
            points = boundary;
        } else points = _pointsFromSegments(boundary, line);
        return points.length ? new LineElement({
            points,
            options: {
                tension: 0
            },
            _loop,
            _fullLoop: _loop
        }) : null;
    }
    function _shouldApplyFill(source) {
        return source && source.fill !== false;
    }
    function _resolveTarget(sources, index, propagate) {
        const source = sources[index];
        let fill = source.fill;
        const visited = [ index ];
        let target;
        if (!propagate) return fill;
        while (fill !== false && visited.indexOf(fill) === -1) {
            if (!isNumberFinite(fill)) return fill;
            target = sources[fill];
            if (!target) return false;
            if (target.visible) return fill;
            visited.push(fill);
            fill = target.fill;
        }
        return false;
    }
    function _decodeFill(line, index, count) {
        const fill = parseFillOption(line);
        if (helpers_segment_isObject(fill)) return isNaN(fill.value) ? false : fill;
        let target = parseFloat(fill);
        if (isNumberFinite(target) && Math.floor(target) === target) return decodeTargetIndex(fill[0], index, target, count);
        return [ "origin", "start", "end", "stack", "shape" ].indexOf(fill) >= 0 && fill;
    }
    function decodeTargetIndex(firstCh, index, target, count) {
        if (firstCh === "-" || firstCh === "+") target = index + target;
        if (target === index || target < 0 || target >= count) return false;
        return target;
    }
    function _getTargetPixel(fill, scale) {
        let pixel = null;
        if (fill === "start") pixel = scale.bottom; else if (fill === "end") pixel = scale.top; else if (helpers_segment_isObject(fill)) pixel = scale.getPixelForValue(fill.value); else if (scale.getBasePixel) pixel = scale.getBasePixel();
        return pixel;
    }
    function _getTargetValue(fill, scale, startValue) {
        let value;
        if (fill === "start") value = startValue; else if (fill === "end") value = scale.options.reverse ? scale.min : scale.max; else if (helpers_segment_isObject(fill)) value = fill.value; else value = scale.getBaseValue();
        return value;
    }
    function parseFillOption(line) {
        const options = line.options;
        const fillOption = options.fill;
        let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
        if (fill === void 0) fill = !!options.backgroundColor;
        if (fill === false || fill === null) return false;
        if (fill === true) return "origin";
        return fill;
    }
    function _buildStackLine(source) {
        const {scale, index, line} = source;
        const points = [];
        const segments = line.segments;
        const sourcePoints = line.points;
        const linesBelow = getLinesBelow(scale, index);
        linesBelow.push(_createBoundaryLine({
            x: null,
            y: scale.bottom
        }, line));
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            for (let j = segment.start; j <= segment.end; j++) addPointsBelow(points, sourcePoints[j], linesBelow);
        }
        return new LineElement({
            points,
            options: {}
        });
    }
    function getLinesBelow(scale, index) {
        const below = [];
        const metas = scale.getMatchingVisibleMetas("line");
        for (let i = 0; i < metas.length; i++) {
            const meta = metas[i];
            if (meta.index === index) break;
            if (!meta.hidden) below.unshift(meta.dataset);
        }
        return below;
    }
    function addPointsBelow(points, sourcePoint, linesBelow) {
        const postponed = [];
        for (let j = 0; j < linesBelow.length; j++) {
            const line = linesBelow[j];
            const {first, last, point} = findPoint(line, sourcePoint, "x");
            if (!point || first && last) continue;
            if (first) postponed.unshift(point); else {
                points.push(point);
                if (!last) break;
            }
        }
        points.push(...postponed);
    }
    function findPoint(line, sourcePoint, property) {
        const point = line.interpolate(sourcePoint, property);
        if (!point) return {};
        const pointValue = point[property];
        const segments = line.segments;
        const linePoints = line.points;
        let first = false;
        let last = false;
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const firstValue = linePoints[segment.start][property];
            const lastValue = linePoints[segment.end][property];
            if (_isBetween(pointValue, firstValue, lastValue)) {
                first = pointValue === firstValue;
                last = pointValue === lastValue;
                break;
            }
        }
        return {
            first,
            last,
            point
        };
    }
    class simpleArc {
        constructor(opts) {
            this.x = opts.x;
            this.y = opts.y;
            this.radius = opts.radius;
        }
        pathSegment(ctx, bounds, opts) {
            const {x, y, radius} = this;
            bounds = bounds || {
                start: 0,
                end: TAU
            };
            ctx.arc(x, y, radius, bounds.end, bounds.start, true);
            return !opts.bounds;
        }
        interpolate(point) {
            const {x, y, radius} = this;
            const angle = point.angle;
            return {
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                angle
            };
        }
    }
    function _getTarget(source) {
        const {chart, fill, line} = source;
        if (isNumberFinite(fill)) return getLineByIndex(chart, fill);
        if (fill === "stack") return _buildStackLine(source);
        if (fill === "shape") return true;
        const boundary = computeBoundary(source);
        if (boundary instanceof simpleArc) return boundary;
        return _createBoundaryLine(boundary, line);
    }
    function getLineByIndex(chart, index) {
        const meta = chart.getDatasetMeta(index);
        const visible = meta && chart.isDatasetVisible(index);
        return visible ? meta.dataset : null;
    }
    function computeBoundary(source) {
        const scale = source.scale || {};
        if (scale.getPointPositionForValue) return computeCircularBoundary(source);
        return computeLinearBoundary(source);
    }
    function computeLinearBoundary(source) {
        const {scale = {}, fill} = source;
        const pixel = _getTargetPixel(fill, scale);
        if (isNumberFinite(pixel)) {
            const horizontal = scale.isHorizontal();
            return {
                x: horizontal ? pixel : null,
                y: horizontal ? null : pixel
            };
        }
        return null;
    }
    function computeCircularBoundary(source) {
        const {scale, fill} = source;
        const options = scale.options;
        const length = scale.getLabels().length;
        const start = options.reverse ? scale.max : scale.min;
        const value = _getTargetValue(fill, scale, start);
        const target = [];
        if (options.grid.circular) {
            const center = scale.getPointPositionForValue(0, start);
            return new simpleArc({
                x: center.x,
                y: center.y,
                radius: scale.getDistanceFromCenterForValue(value)
            });
        }
        for (let i = 0; i < length; ++i) target.push(scale.getPointPositionForValue(i, value));
        return target;
    }
    function _drawfill(ctx, source, area) {
        const target = _getTarget(source);
        const {line, scale, axis} = source;
        const lineOpts = line.options;
        const fillOption = lineOpts.fill;
        const color = lineOpts.backgroundColor;
        const {above = color, below = color} = fillOption || {};
        if (target && line.points.length) {
            clipArea(ctx, area);
            doFill(ctx, {
                line,
                target,
                above,
                below,
                area,
                scale,
                axis
            });
            unclipArea(ctx);
        }
    }
    function doFill(ctx, cfg) {
        const {line, target, above, below, area, scale} = cfg;
        const property = line._loop ? "angle" : cfg.axis;
        ctx.save();
        if (property === "x" && below !== above) {
            clipVertical(ctx, target, area.top);
            fill(ctx, {
                line,
                target,
                color: above,
                scale,
                property
            });
            ctx.restore();
            ctx.save();
            clipVertical(ctx, target, area.bottom);
        }
        fill(ctx, {
            line,
            target,
            color: below,
            scale,
            property
        });
        ctx.restore();
    }
    function clipVertical(ctx, target, clipY) {
        const {segments, points} = target;
        let first = true;
        let lineLoop = false;
        ctx.beginPath();
        for (const segment of segments) {
            const {start, end} = segment;
            const firstPoint = points[start];
            const lastPoint = points[_findSegmentEnd(start, end, points)];
            if (first) {
                ctx.moveTo(firstPoint.x, firstPoint.y);
                first = false;
            } else {
                ctx.lineTo(firstPoint.x, clipY);
                ctx.lineTo(firstPoint.x, firstPoint.y);
            }
            lineLoop = !!target.pathSegment(ctx, segment, {
                move: lineLoop
            });
            if (lineLoop) ctx.closePath(); else ctx.lineTo(lastPoint.x, clipY);
        }
        ctx.lineTo(target.first().x, clipY);
        ctx.closePath();
        ctx.clip();
    }
    function fill(ctx, cfg) {
        const {line, target, property, color, scale} = cfg;
        const segments = _segments(line, target, property);
        for (const {source: src, target: tgt, start, end} of segments) {
            const {style: {backgroundColor = color} = {}} = src;
            const notShape = target !== true;
            ctx.save();
            ctx.fillStyle = backgroundColor;
            clipBounds(ctx, scale, notShape && _getBounds(property, start, end));
            ctx.beginPath();
            const lineLoop = !!line.pathSegment(ctx, src);
            let loop;
            if (notShape) {
                if (lineLoop) ctx.closePath(); else interpolatedLineTo(ctx, target, end, property);
                const targetLoop = !!target.pathSegment(ctx, tgt, {
                    move: lineLoop,
                    reverse: true
                });
                loop = lineLoop && targetLoop;
                if (!loop) interpolatedLineTo(ctx, target, start, property);
            }
            ctx.closePath();
            ctx.fill(loop ? "evenodd" : "nonzero");
            ctx.restore();
        }
    }
    function clipBounds(ctx, scale, bounds) {
        const {top, bottom} = scale.chart.chartArea;
        const {property, start, end} = bounds || {};
        if (property === "x") {
            ctx.beginPath();
            ctx.rect(start, top, end - start, bottom - top);
            ctx.clip();
        }
    }
    function interpolatedLineTo(ctx, target, point, property) {
        const interpolatedPoint = target.interpolate(point, property);
        if (interpolatedPoint) ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
    }
    var index = {
        id: "filler",
        afterDatasetsUpdate(chart, _args, options) {
            const count = (chart.data.datasets || []).length;
            const sources = [];
            let meta, i, line, source;
            for (i = 0; i < count; ++i) {
                meta = chart.getDatasetMeta(i);
                line = meta.dataset;
                source = null;
                if (line && line.options && line instanceof LineElement) source = {
                    visible: chart.isDatasetVisible(i),
                    index: i,
                    fill: _decodeFill(line, i, count),
                    chart,
                    axis: meta.controller.options.indexAxis,
                    scale: meta.vScale,
                    line
                };
                meta.$filler = source;
                sources.push(source);
            }
            for (i = 0; i < count; ++i) {
                source = sources[i];
                if (!source || source.fill === false) continue;
                source.fill = _resolveTarget(sources, i, options.propagate);
            }
        },
        beforeDraw(chart, _args, options) {
            const draw = options.drawTime === "beforeDraw";
            const metasets = chart.getSortedVisibleDatasetMetas();
            const area = chart.chartArea;
            for (let i = metasets.length - 1; i >= 0; --i) {
                const source = metasets[i].$filler;
                if (!source) continue;
                source.line.updateControlPoints(area, source.axis);
                if (draw && source.fill) _drawfill(chart.ctx, source, area);
            }
        },
        beforeDatasetsDraw(chart, _args, options) {
            if (options.drawTime !== "beforeDatasetsDraw") return;
            const metasets = chart.getSortedVisibleDatasetMetas();
            for (let i = metasets.length - 1; i >= 0; --i) {
                const source = metasets[i].$filler;
                if (_shouldApplyFill(source)) _drawfill(chart.ctx, source, chart.chartArea);
            }
        },
        beforeDatasetDraw(chart, args, options) {
            const source = args.meta.$filler;
            if (!_shouldApplyFill(source) || options.drawTime !== "beforeDatasetDraw") return;
            _drawfill(chart.ctx, source, chart.chartArea);
        },
        defaults: {
            propagate: true,
            drawTime: "beforeDatasetDraw"
        }
    };
    const getBoxSize = (labelOpts, fontSize) => {
        let {boxHeight = fontSize, boxWidth = fontSize} = labelOpts;
        if (labelOpts.usePointStyle) {
            boxHeight = Math.min(boxHeight, fontSize);
            boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
        }
        return {
            boxWidth,
            boxHeight,
            itemHeight: Math.max(fontSize, boxHeight)
        };
    };
    const itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
    class Legend extends Element {
        constructor(config) {
            super();
            this._added = false;
            this.legendHitBoxes = [];
            this._hoveredItem = null;
            this.doughnutMode = false;
            this.chart = config.chart;
            this.options = config.options;
            this.ctx = config.ctx;
            this.legendItems = void 0;
            this.columnSizes = void 0;
            this.lineWidths = void 0;
            this.maxHeight = void 0;
            this.maxWidth = void 0;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.height = void 0;
            this.width = void 0;
            this._margins = void 0;
            this.position = void 0;
            this.weight = void 0;
            this.fullSize = void 0;
        }
        update(maxWidth, maxHeight, margins) {
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this._margins = margins;
            this.setDimensions();
            this.buildLabels();
            this.fit();
        }
        setDimensions() {
            if (this.isHorizontal()) {
                this.width = this.maxWidth;
                this.left = this._margins.left;
                this.right = this.width;
            } else {
                this.height = this.maxHeight;
                this.top = this._margins.top;
                this.bottom = this.height;
            }
        }
        buildLabels() {
            const labelOpts = this.options.labels || {};
            let legendItems = callback(labelOpts.generateLabels, [ this.chart ], this) || [];
            if (labelOpts.filter) legendItems = legendItems.filter((item => labelOpts.filter(item, this.chart.data)));
            if (labelOpts.sort) legendItems = legendItems.sort(((a, b) => labelOpts.sort(a, b, this.chart.data)));
            if (this.options.reverse) legendItems.reverse();
            this.legendItems = legendItems;
        }
        fit() {
            const {options, ctx} = this;
            if (!options.display) {
                this.width = this.height = 0;
                return;
            }
            const labelOpts = options.labels;
            const labelFont = toFont(labelOpts.font);
            const fontSize = labelFont.size;
            const titleHeight = this._computeTitleHeight();
            const {boxWidth, itemHeight} = getBoxSize(labelOpts, fontSize);
            let width, height;
            ctx.font = labelFont.string;
            if (this.isHorizontal()) {
                width = this.maxWidth;
                height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
            } else {
                height = this.maxHeight;
                width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
            }
            this.width = Math.min(width, options.maxWidth || this.maxWidth);
            this.height = Math.min(height, options.maxHeight || this.maxHeight);
        }
        _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
            const {ctx, maxWidth, options: {labels: {padding}}} = this;
            const hitboxes = this.legendHitBoxes = [];
            const lineWidths = this.lineWidths = [ 0 ];
            const lineHeight = itemHeight + padding;
            let totalHeight = titleHeight;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            let row = -1;
            let top = -lineHeight;
            this.legendItems.forEach(((legendItem, i) => {
                const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
                if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                    totalHeight += lineHeight;
                    lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                    top += lineHeight;
                    row++;
                }
                hitboxes[i] = {
                    left: 0,
                    top,
                    row,
                    width: itemWidth,
                    height: itemHeight
                };
                lineWidths[lineWidths.length - 1] += itemWidth + padding;
            }));
            return totalHeight;
        }
        _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
            const {ctx, maxHeight, options: {labels: {padding}}} = this;
            const hitboxes = this.legendHitBoxes = [];
            const columnSizes = this.columnSizes = [];
            const heightLimit = maxHeight - titleHeight;
            let totalWidth = padding;
            let currentColWidth = 0;
            let currentColHeight = 0;
            let left = 0;
            let col = 0;
            this.legendItems.forEach(((legendItem, i) => {
                const {itemWidth, itemHeight} = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
                if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                    totalWidth += currentColWidth + padding;
                    columnSizes.push({
                        width: currentColWidth,
                        height: currentColHeight
                    });
                    left += currentColWidth + padding;
                    col++;
                    currentColWidth = currentColHeight = 0;
                }
                hitboxes[i] = {
                    left,
                    top: currentColHeight,
                    col,
                    width: itemWidth,
                    height: itemHeight
                };
                currentColWidth = Math.max(currentColWidth, itemWidth);
                currentColHeight += itemHeight + padding;
            }));
            totalWidth += currentColWidth;
            columnSizes.push({
                width: currentColWidth,
                height: currentColHeight
            });
            return totalWidth;
        }
        adjustHitBoxes() {
            if (!this.options.display) return;
            const titleHeight = this._computeTitleHeight();
            const {legendHitBoxes: hitboxes, options: {align, labels: {padding}, rtl}} = this;
            const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
            if (this.isHorizontal()) {
                let row = 0;
                let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                for (const hitbox of hitboxes) {
                    if (row !== hitbox.row) {
                        row = hitbox.row;
                        left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                    }
                    hitbox.top += this.top + titleHeight + padding;
                    hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                    left += hitbox.width + padding;
                }
            } else {
                let col = 0;
                let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                for (const hitbox of hitboxes) {
                    if (hitbox.col !== col) {
                        col = hitbox.col;
                        top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                    }
                    hitbox.top = top;
                    hitbox.left += this.left + padding;
                    hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
                    top += hitbox.height + padding;
                }
            }
        }
        isHorizontal() {
            return this.options.position === "top" || this.options.position === "bottom";
        }
        draw() {
            if (this.options.display) {
                const ctx = this.ctx;
                clipArea(ctx, this);
                this._draw();
                unclipArea(ctx);
            }
        }
        _draw() {
            const {options: opts, columnSizes, lineWidths, ctx} = this;
            const {align, labels: labelOpts} = opts;
            const defaultColor = helpers_segment_defaults.color;
            const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
            const labelFont = toFont(labelOpts.font);
            const {padding} = labelOpts;
            const fontSize = labelFont.size;
            const halfFontSize = fontSize / 2;
            let cursor;
            this.drawTitle();
            ctx.textAlign = rtlHelper.textAlign("left");
            ctx.textBaseline = "middle";
            ctx.lineWidth = .5;
            ctx.font = labelFont.string;
            const {boxWidth, boxHeight, itemHeight} = getBoxSize(labelOpts, fontSize);
            const drawLegendBox = function(x, y, legendItem) {
                if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) return;
                ctx.save();
                const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
                ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
                ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
                ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
                ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
                ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
                if (labelOpts.usePointStyle) {
                    const drawOptions = {
                        radius: boxHeight * Math.SQRT2 / 2,
                        pointStyle: legendItem.pointStyle,
                        rotation: legendItem.rotation,
                        borderWidth: lineWidth
                    };
                    const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                    const centerY = y + halfFontSize;
                    drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
                } else {
                    const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                    const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                    const borderRadius = toTRBLCorners(legendItem.borderRadius);
                    ctx.beginPath();
                    if (Object.values(borderRadius).some((v => v !== 0))) addRoundedRectPath(ctx, {
                        x: xBoxLeft,
                        y: yBoxTop,
                        w: boxWidth,
                        h: boxHeight,
                        radius: borderRadius
                    }); else ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                    ctx.fill();
                    if (lineWidth !== 0) ctx.stroke();
                }
                ctx.restore();
            };
            const fillText = function(x, y, legendItem) {
                renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                    strikethrough: legendItem.hidden,
                    textAlign: rtlHelper.textAlign(legendItem.textAlign)
                });
            };
            const isHorizontal = this.isHorizontal();
            const titleHeight = this._computeTitleHeight();
            if (isHorizontal) cursor = {
                x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
                y: this.top + padding + titleHeight,
                line: 0
            }; else cursor = {
                x: this.left + padding,
                y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                line: 0
            };
            overrideTextDirection(this.ctx, opts.textDirection);
            const lineHeight = itemHeight + padding;
            this.legendItems.forEach(((legendItem, i) => {
                ctx.strokeStyle = legendItem.fontColor;
                ctx.fillStyle = legendItem.fontColor;
                const textWidth = ctx.measureText(legendItem.text).width;
                const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
                const width = boxWidth + halfFontSize + textWidth;
                let x = cursor.x;
                let y = cursor.y;
                rtlHelper.setWidth(this.width);
                if (isHorizontal) {
                    if (i > 0 && x + width + padding > this.right) {
                        y = cursor.y += lineHeight;
                        cursor.line++;
                        x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
                    }
                } else if (i > 0 && y + lineHeight > this.bottom) {
                    x = cursor.x = x + columnSizes[cursor.line].width + padding;
                    cursor.line++;
                    y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
                }
                const realX = rtlHelper.x(x);
                drawLegendBox(realX, y, legendItem);
                x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
                fillText(rtlHelper.x(x), y, legendItem);
                if (isHorizontal) cursor.x += width + padding; else if (typeof legendItem.text !== "string") {
                    const fontLineHeight = labelFont.lineHeight;
                    cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
                } else cursor.y += lineHeight;
            }));
            restoreTextDirection(this.ctx, opts.textDirection);
        }
        drawTitle() {
            const opts = this.options;
            const titleOpts = opts.title;
            const titleFont = toFont(titleOpts.font);
            const titlePadding = toPadding(titleOpts.padding);
            if (!titleOpts.display) return;
            const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
            const ctx = this.ctx;
            const position = titleOpts.position;
            const halfFontSize = titleFont.size / 2;
            const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
            let y;
            let left = this.left;
            let maxWidth = this.width;
            if (this.isHorizontal()) {
                maxWidth = Math.max(...this.lineWidths);
                y = this.top + topPaddingPlusHalfFontSize;
                left = _alignStartEnd(opts.align, left, this.right - maxWidth);
            } else {
                const maxHeight = this.columnSizes.reduce(((acc, size) => Math.max(acc, size.height)), 0);
                y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
            }
            const x = _alignStartEnd(position, left, left + maxWidth);
            ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
            ctx.textBaseline = "middle";
            ctx.strokeStyle = titleOpts.color;
            ctx.fillStyle = titleOpts.color;
            ctx.font = titleFont.string;
            renderText(ctx, titleOpts.text, x, y, titleFont);
        }
        _computeTitleHeight() {
            const titleOpts = this.options.title;
            const titleFont = toFont(titleOpts.font);
            const titlePadding = toPadding(titleOpts.padding);
            return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
        }
        _getLegendItemAt(x, y) {
            let i, hitBox, lh;
            if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
                lh = this.legendHitBoxes;
                for (i = 0; i < lh.length; ++i) {
                    hitBox = lh[i];
                    if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) return this.legendItems[i];
                }
            }
            return null;
        }
        handleEvent(e) {
            const opts = this.options;
            if (!isListened(e.type, opts)) return;
            const hoveredItem = this._getLegendItemAt(e.x, e.y);
            if (e.type === "mousemove" || e.type === "mouseout") {
                const previous = this._hoveredItem;
                const sameItem = itemsEqual(previous, hoveredItem);
                if (previous && !sameItem) callback(opts.onLeave, [ e, previous, this ], this);
                this._hoveredItem = hoveredItem;
                if (hoveredItem && !sameItem) callback(opts.onHover, [ e, hoveredItem, this ], this);
            } else if (hoveredItem) callback(opts.onClick, [ e, hoveredItem, this ], this);
        }
    }
    function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
        const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
        const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
        return {
            itemWidth,
            itemHeight
        };
    }
    function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
        let legendItemText = legendItem.text;
        if (legendItemText && typeof legendItemText !== "string") legendItemText = legendItemText.reduce(((a, b) => a.length > b.length ? a : b));
        return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
    }
    function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
        let itemHeight = _itemHeight;
        if (typeof legendItem.text !== "string") itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
        return itemHeight;
    }
    function calculateLegendItemHeight(legendItem, fontLineHeight) {
        const labelHeight = legendItem.text ? legendItem.text.length : 0;
        return fontLineHeight * labelHeight;
    }
    function isListened(type, opts) {
        if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) return true;
        if (opts.onClick && (type === "click" || type === "mouseup")) return true;
        return false;
    }
    var plugin_legend = {
        id: "legend",
        _element: Legend,
        start(chart, _args, options) {
            const legend = chart.legend = new Legend({
                ctx: chart.ctx,
                options,
                chart
            });
            layouts.configure(chart, legend, options);
            layouts.addBox(chart, legend);
        },
        stop(chart) {
            layouts.removeBox(chart, chart.legend);
            delete chart.legend;
        },
        beforeUpdate(chart, _args, options) {
            const legend = chart.legend;
            layouts.configure(chart, legend, options);
            legend.options = options;
        },
        afterUpdate(chart) {
            const legend = chart.legend;
            legend.buildLabels();
            legend.adjustHitBoxes();
        },
        afterEvent(chart, args) {
            if (!args.replay) chart.legend.handleEvent(args.event);
        },
        defaults: {
            display: true,
            position: "top",
            align: "center",
            fullSize: true,
            reverse: false,
            weight: 1e3,
            onClick(e, legendItem, legend) {
                const index = legendItem.datasetIndex;
                const ci = legend.chart;
                if (ci.isDatasetVisible(index)) {
                    ci.hide(index);
                    legendItem.hidden = true;
                } else {
                    ci.show(index);
                    legendItem.hidden = false;
                }
            },
            onHover: null,
            onLeave: null,
            labels: {
                color: ctx => ctx.chart.options.color,
                boxWidth: 40,
                padding: 10,
                generateLabels(chart) {
                    const datasets = chart.data.datasets;
                    const {labels: {usePointStyle, pointStyle, textAlign, color, useBorderRadius, borderRadius}} = chart.legend.options;
                    return chart._getSortedDatasetMetas().map((meta => {
                        const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                        const borderWidth = toPadding(style.borderWidth);
                        return {
                            text: datasets[meta.index].label,
                            fillStyle: style.backgroundColor,
                            fontColor: color,
                            hidden: !meta.visible,
                            lineCap: style.borderCapStyle,
                            lineDash: style.borderDash,
                            lineDashOffset: style.borderDashOffset,
                            lineJoin: style.borderJoinStyle,
                            lineWidth: (borderWidth.width + borderWidth.height) / 4,
                            strokeStyle: style.borderColor,
                            pointStyle: pointStyle || style.pointStyle,
                            rotation: style.rotation,
                            textAlign: textAlign || style.textAlign,
                            borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                            datasetIndex: meta.index
                        };
                    }), this);
                }
            },
            title: {
                color: ctx => ctx.chart.options.color,
                display: false,
                position: "center",
                text: ""
            }
        },
        descriptors: {
            _scriptable: name => !name.startsWith("on"),
            labels: {
                _scriptable: name => ![ "generateLabels", "filter", "sort" ].includes(name)
            }
        }
    };
    class Title extends Element {
        constructor(config) {
            super();
            this.chart = config.chart;
            this.options = config.options;
            this.ctx = config.ctx;
            this._padding = void 0;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.width = void 0;
            this.height = void 0;
            this.position = void 0;
            this.weight = void 0;
            this.fullSize = void 0;
        }
        update(maxWidth, maxHeight) {
            const opts = this.options;
            this.left = 0;
            this.top = 0;
            if (!opts.display) {
                this.width = this.height = this.right = this.bottom = 0;
                return;
            }
            this.width = this.right = maxWidth;
            this.height = this.bottom = maxHeight;
            const lineCount = isArray(opts.text) ? opts.text.length : 1;
            this._padding = toPadding(opts.padding);
            const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
            if (this.isHorizontal()) this.height = textSize; else this.width = textSize;
        }
        isHorizontal() {
            const pos = this.options.position;
            return pos === "top" || pos === "bottom";
        }
        _drawArgs(offset) {
            const {top, left, bottom, right, options} = this;
            const align = options.align;
            let rotation = 0;
            let maxWidth, titleX, titleY;
            if (this.isHorizontal()) {
                titleX = _alignStartEnd(align, left, right);
                titleY = top + offset;
                maxWidth = right - left;
            } else {
                if (options.position === "left") {
                    titleX = left + offset;
                    titleY = _alignStartEnd(align, bottom, top);
                    rotation = PI * -.5;
                } else {
                    titleX = right - offset;
                    titleY = _alignStartEnd(align, top, bottom);
                    rotation = PI * .5;
                }
                maxWidth = bottom - top;
            }
            return {
                titleX,
                titleY,
                maxWidth,
                rotation
            };
        }
        draw() {
            const ctx = this.ctx;
            const opts = this.options;
            if (!opts.display) return;
            const fontOpts = toFont(opts.font);
            const lineHeight = fontOpts.lineHeight;
            const offset = lineHeight / 2 + this._padding.top;
            const {titleX, titleY, maxWidth, rotation} = this._drawArgs(offset);
            renderText(ctx, opts.text, 0, 0, fontOpts, {
                color: opts.color,
                maxWidth,
                rotation,
                textAlign: _toLeftRightCenter(opts.align),
                textBaseline: "middle",
                translation: [ titleX, titleY ]
            });
        }
    }
    function createTitle(chart, titleOpts) {
        const title = new Title({
            ctx: chart.ctx,
            options: titleOpts,
            chart
        });
        layouts.configure(chart, title, titleOpts);
        layouts.addBox(chart, title);
        chart.titleBlock = title;
    }
    var plugin_title = {
        id: "title",
        _element: Title,
        start(chart, _args, options) {
            createTitle(chart, options);
        },
        stop(chart) {
            const titleBlock = chart.titleBlock;
            layouts.removeBox(chart, titleBlock);
            delete chart.titleBlock;
        },
        beforeUpdate(chart, _args, options) {
            const title = chart.titleBlock;
            layouts.configure(chart, title, options);
            title.options = options;
        },
        defaults: {
            align: "center",
            display: false,
            font: {
                weight: "bold"
            },
            fullSize: true,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
        },
        defaultRoutes: {
            color: "color"
        },
        descriptors: {
            _scriptable: true,
            _indexable: false
        }
    };
    const chart_map = new WeakMap;
    var plugin_subtitle = {
        id: "subtitle",
        start(chart, _args, options) {
            const title = new Title({
                ctx: chart.ctx,
                options,
                chart
            });
            layouts.configure(chart, title, options);
            layouts.addBox(chart, title);
            chart_map.set(chart, title);
        },
        stop(chart) {
            layouts.removeBox(chart, chart_map.get(chart));
            chart_map.delete(chart);
        },
        beforeUpdate(chart, _args, options) {
            const title = chart_map.get(chart);
            layouts.configure(chart, title, options);
            title.options = options;
        },
        defaults: {
            align: "center",
            display: false,
            font: {
                weight: "normal"
            },
            fullSize: true,
            padding: 0,
            position: "top",
            text: "",
            weight: 1500
        },
        defaultRoutes: {
            color: "color"
        },
        descriptors: {
            _scriptable: true,
            _indexable: false
        }
    };
    const positioners = {
        average(items) {
            if (!items.length) return false;
            let i, len;
            let xSet = new Set;
            let y = 0;
            let count = 0;
            for (i = 0, len = items.length; i < len; ++i) {
                const el = items[i].element;
                if (el && el.hasValue()) {
                    const pos = el.tooltipPosition();
                    xSet.add(pos.x);
                    y += pos.y;
                    ++count;
                }
            }
            if (count === 0 || xSet.size === 0) return false;
            const xAverage = [ ...xSet ].reduce(((a, b) => a + b)) / xSet.size;
            return {
                x: xAverage,
                y: y / count
            };
        },
        nearest(items, eventPosition) {
            if (!items.length) return false;
            let x = eventPosition.x;
            let y = eventPosition.y;
            let minDistance = Number.POSITIVE_INFINITY;
            let i, len, nearestElement;
            for (i = 0, len = items.length; i < len; ++i) {
                const el = items[i].element;
                if (el && el.hasValue()) {
                    const center = el.getCenterPoint();
                    const d = distanceBetweenPoints(eventPosition, center);
                    if (d < minDistance) {
                        minDistance = d;
                        nearestElement = el;
                    }
                }
            }
            if (nearestElement) {
                const tp = nearestElement.tooltipPosition();
                x = tp.x;
                y = tp.y;
            }
            return {
                x,
                y
            };
        }
    };
    function pushOrConcat(base, toPush) {
        if (toPush) if (isArray(toPush)) Array.prototype.push.apply(base, toPush); else base.push(toPush);
        return base;
    }
    function splitNewlines(str) {
        if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) return str.split("\n");
        return str;
    }
    function createTooltipItem(chart, item) {
        const {element, datasetIndex, index} = item;
        const controller = chart.getDatasetMeta(datasetIndex).controller;
        const {label, value} = controller.getLabelAndValue(index);
        return {
            chart,
            label,
            parsed: controller.getParsed(index),
            raw: chart.data.datasets[datasetIndex].data[index],
            formattedValue: value,
            dataset: controller.getDataset(),
            dataIndex: index,
            datasetIndex,
            element
        };
    }
    function getTooltipSize(tooltip, options) {
        const ctx = tooltip.chart.ctx;
        const {body, footer, title} = tooltip;
        const {boxWidth, boxHeight} = options;
        const bodyFont = toFont(options.bodyFont);
        const titleFont = toFont(options.titleFont);
        const footerFont = toFont(options.footerFont);
        const titleLineCount = title.length;
        const footerLineCount = footer.length;
        const bodyLineItemCount = body.length;
        const padding = toPadding(options.padding);
        let height = padding.height;
        let width = 0;
        let combinedBodyLength = body.reduce(((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length), 0);
        combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
        if (titleLineCount) height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
        if (combinedBodyLength) {
            const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
            height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
        }
        if (footerLineCount) height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
        let widthPadding = 0;
        const maxLineWidth = function(line) {
            width = Math.max(width, ctx.measureText(line).width + widthPadding);
        };
        ctx.save();
        ctx.font = titleFont.string;
        each(tooltip.title, maxLineWidth);
        ctx.font = bodyFont.string;
        each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
        widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
        each(body, (bodyItem => {
            each(bodyItem.before, maxLineWidth);
            each(bodyItem.lines, maxLineWidth);
            each(bodyItem.after, maxLineWidth);
        }));
        widthPadding = 0;
        ctx.font = footerFont.string;
        each(tooltip.footer, maxLineWidth);
        ctx.restore();
        width += padding.width;
        return {
            width,
            height
        };
    }
    function determineYAlign(chart, size) {
        const {y, height} = size;
        if (y < height / 2) return "top"; else if (y > chart.height - height / 2) return "bottom";
        return "center";
    }
    function doesNotFitWithAlign(xAlign, chart, options, size) {
        const {x, width} = size;
        const caret = options.caretSize + options.caretPadding;
        if (xAlign === "left" && x + width + caret > chart.width) return true;
        if (xAlign === "right" && x - width - caret < 0) return true;
    }
    function determineXAlign(chart, options, size, yAlign) {
        const {x, width} = size;
        const {width: chartWidth, chartArea: {left, right}} = chart;
        let xAlign = "center";
        if (yAlign === "center") xAlign = x <= (left + right) / 2 ? "left" : "right"; else if (x <= width / 2) xAlign = "left"; else if (x >= chartWidth - width / 2) xAlign = "right";
        if (doesNotFitWithAlign(xAlign, chart, options, size)) xAlign = "center";
        return xAlign;
    }
    function determineAlignment(chart, options, size) {
        const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
        return {
            xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
            yAlign
        };
    }
    function alignX(size, xAlign) {
        let {x, width} = size;
        if (xAlign === "right") x -= width; else if (xAlign === "center") x -= width / 2;
        return x;
    }
    function alignY(size, yAlign, paddingAndSize) {
        let {y, height} = size;
        if (yAlign === "top") y += paddingAndSize; else if (yAlign === "bottom") y -= height + paddingAndSize; else y -= height / 2;
        return y;
    }
    function getBackgroundPoint(options, size, alignment, chart) {
        const {caretSize, caretPadding, cornerRadius} = options;
        const {xAlign, yAlign} = alignment;
        const paddingAndSize = caretSize + caretPadding;
        const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(cornerRadius);
        let x = alignX(size, xAlign);
        const y = alignY(size, yAlign, paddingAndSize);
        if (yAlign === "center") {
            if (xAlign === "left") x += paddingAndSize; else if (xAlign === "right") x -= paddingAndSize;
        } else if (xAlign === "left") x -= Math.max(topLeft, bottomLeft) + caretSize; else if (xAlign === "right") x += Math.max(topRight, bottomRight) + caretSize;
        return {
            x: _limitValue(x, 0, chart.width - size.width),
            y: _limitValue(y, 0, chart.height - size.height)
        };
    }
    function getAlignedX(tooltip, align, options) {
        const padding = toPadding(options.padding);
        return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
    }
    function getBeforeAfterBodyLines(callback) {
        return pushOrConcat([], splitNewlines(callback));
    }
    function createTooltipContext(parent, tooltip, tooltipItems) {
        return createContext(parent, {
            tooltip,
            tooltipItems,
            type: "tooltip"
        });
    }
    function overrideCallbacks(callbacks, context) {
        const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
        return override ? callbacks.override(override) : callbacks;
    }
    const defaultCallbacks = {
        beforeTitle: noop,
        title(tooltipItems) {
            if (tooltipItems.length > 0) {
                const item = tooltipItems[0];
                const labels = item.chart.data.labels;
                const labelCount = labels ? labels.length : 0;
                if (this && this.options && this.options.mode === "dataset") return item.dataset.label || ""; else if (item.label) return item.label; else if (labelCount > 0 && item.dataIndex < labelCount) return labels[item.dataIndex];
            }
            return "";
        },
        afterTitle: noop,
        beforeBody: noop,
        beforeLabel: noop,
        label(tooltipItem) {
            if (this && this.options && this.options.mode === "dataset") return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
            let label = tooltipItem.dataset.label || "";
            if (label) label += ": ";
            const value = tooltipItem.formattedValue;
            if (!isNullOrUndef(value)) label += value;
            return label;
        },
        labelColor(tooltipItem) {
            const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
            const options = meta.controller.getStyle(tooltipItem.dataIndex);
            return {
                borderColor: options.borderColor,
                backgroundColor: options.backgroundColor,
                borderWidth: options.borderWidth,
                borderDash: options.borderDash,
                borderDashOffset: options.borderDashOffset,
                borderRadius: 0
            };
        },
        labelTextColor() {
            return this.options.bodyColor;
        },
        labelPointStyle(tooltipItem) {
            const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
            const options = meta.controller.getStyle(tooltipItem.dataIndex);
            return {
                pointStyle: options.pointStyle,
                rotation: options.rotation
            };
        },
        afterLabel: noop,
        afterBody: noop,
        beforeFooter: noop,
        footer: noop,
        afterFooter: noop
    };
    function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
        const result = callbacks[name].call(ctx, arg);
        if (typeof result === "undefined") return defaultCallbacks[name].call(ctx, arg);
        return result;
    }
    class Tooltip extends Element {
        static positioners=positioners;
        constructor(config) {
            super();
            this.opacity = 0;
            this._active = [];
            this._eventPosition = void 0;
            this._size = void 0;
            this._cachedAnimations = void 0;
            this._tooltipItems = [];
            this.$animations = void 0;
            this.$context = void 0;
            this.chart = config.chart;
            this.options = config.options;
            this.dataPoints = void 0;
            this.title = void 0;
            this.beforeBody = void 0;
            this.body = void 0;
            this.afterBody = void 0;
            this.footer = void 0;
            this.xAlign = void 0;
            this.yAlign = void 0;
            this.x = void 0;
            this.y = void 0;
            this.height = void 0;
            this.width = void 0;
            this.caretX = void 0;
            this.caretY = void 0;
            this.labelColors = void 0;
            this.labelPointStyles = void 0;
            this.labelTextColors = void 0;
        }
        initialize(options) {
            this.options = options;
            this._cachedAnimations = void 0;
            this.$context = void 0;
        }
        _resolveAnimations() {
            const cached = this._cachedAnimations;
            if (cached) return cached;
            const chart = this.chart;
            const options = this.options.setContext(this.getContext());
            const opts = options.enabled && chart.options.animation && options.animations;
            const animations = new Animations(this.chart, opts);
            if (opts._cacheable) this._cachedAnimations = Object.freeze(animations);
            return animations;
        }
        getContext() {
            return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
        }
        getTitle(context, options) {
            const {callbacks} = options;
            const beforeTitle = invokeCallbackWithFallback(callbacks, "beforeTitle", this, context);
            const title = invokeCallbackWithFallback(callbacks, "title", this, context);
            const afterTitle = invokeCallbackWithFallback(callbacks, "afterTitle", this, context);
            let lines = [];
            lines = pushOrConcat(lines, splitNewlines(beforeTitle));
            lines = pushOrConcat(lines, splitNewlines(title));
            lines = pushOrConcat(lines, splitNewlines(afterTitle));
            return lines;
        }
        getBeforeBody(tooltipItems, options) {
            return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "beforeBody", this, tooltipItems));
        }
        getBody(tooltipItems, options) {
            const {callbacks} = options;
            const bodyItems = [];
            each(tooltipItems, (context => {
                const bodyItem = {
                    before: [],
                    lines: [],
                    after: []
                };
                const scoped = overrideCallbacks(callbacks, context);
                pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, "beforeLabel", this, context)));
                pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, "label", this, context));
                pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, "afterLabel", this, context)));
                bodyItems.push(bodyItem);
            }));
            return bodyItems;
        }
        getAfterBody(tooltipItems, options) {
            return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "afterBody", this, tooltipItems));
        }
        getFooter(tooltipItems, options) {
            const {callbacks} = options;
            const beforeFooter = invokeCallbackWithFallback(callbacks, "beforeFooter", this, tooltipItems);
            const footer = invokeCallbackWithFallback(callbacks, "footer", this, tooltipItems);
            const afterFooter = invokeCallbackWithFallback(callbacks, "afterFooter", this, tooltipItems);
            let lines = [];
            lines = pushOrConcat(lines, splitNewlines(beforeFooter));
            lines = pushOrConcat(lines, splitNewlines(footer));
            lines = pushOrConcat(lines, splitNewlines(afterFooter));
            return lines;
        }
        _createItems(options) {
            const active = this._active;
            const data = this.chart.data;
            const labelColors = [];
            const labelPointStyles = [];
            const labelTextColors = [];
            let tooltipItems = [];
            let i, len;
            for (i = 0, len = active.length; i < len; ++i) tooltipItems.push(createTooltipItem(this.chart, active[i]));
            if (options.filter) tooltipItems = tooltipItems.filter(((element, index, array) => options.filter(element, index, array, data)));
            if (options.itemSort) tooltipItems = tooltipItems.sort(((a, b) => options.itemSort(a, b, data)));
            each(tooltipItems, (context => {
                const scoped = overrideCallbacks(options.callbacks, context);
                labelColors.push(invokeCallbackWithFallback(scoped, "labelColor", this, context));
                labelPointStyles.push(invokeCallbackWithFallback(scoped, "labelPointStyle", this, context));
                labelTextColors.push(invokeCallbackWithFallback(scoped, "labelTextColor", this, context));
            }));
            this.labelColors = labelColors;
            this.labelPointStyles = labelPointStyles;
            this.labelTextColors = labelTextColors;
            this.dataPoints = tooltipItems;
            return tooltipItems;
        }
        update(changed, replay) {
            const options = this.options.setContext(this.getContext());
            const active = this._active;
            let properties;
            let tooltipItems = [];
            if (!active.length) {
                if (this.opacity !== 0) properties = {
                    opacity: 0
                };
            } else {
                const position = positioners[options.position].call(this, active, this._eventPosition);
                tooltipItems = this._createItems(options);
                this.title = this.getTitle(tooltipItems, options);
                this.beforeBody = this.getBeforeBody(tooltipItems, options);
                this.body = this.getBody(tooltipItems, options);
                this.afterBody = this.getAfterBody(tooltipItems, options);
                this.footer = this.getFooter(tooltipItems, options);
                const size = this._size = getTooltipSize(this, options);
                const positionAndSize = Object.assign({}, position, size);
                const alignment = determineAlignment(this.chart, options, positionAndSize);
                const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
                this.xAlign = alignment.xAlign;
                this.yAlign = alignment.yAlign;
                properties = {
                    opacity: 1,
                    x: backgroundPoint.x,
                    y: backgroundPoint.y,
                    width: size.width,
                    height: size.height,
                    caretX: position.x,
                    caretY: position.y
                };
            }
            this._tooltipItems = tooltipItems;
            this.$context = void 0;
            if (properties) this._resolveAnimations().update(this, properties);
            if (changed && options.external) options.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay
            });
        }
        drawCaret(tooltipPoint, ctx, size, options) {
            const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
            ctx.lineTo(caretPosition.x1, caretPosition.y1);
            ctx.lineTo(caretPosition.x2, caretPosition.y2);
            ctx.lineTo(caretPosition.x3, caretPosition.y3);
        }
        getCaretPosition(tooltipPoint, size, options) {
            const {xAlign, yAlign} = this;
            const {caretSize, cornerRadius} = options;
            const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(cornerRadius);
            const {x: ptX, y: ptY} = tooltipPoint;
            const {width, height} = size;
            let x1, x2, x3, y1, y2, y3;
            if (yAlign === "center") {
                y2 = ptY + height / 2;
                if (xAlign === "left") {
                    x1 = ptX;
                    x2 = x1 - caretSize;
                    y1 = y2 + caretSize;
                    y3 = y2 - caretSize;
                } else {
                    x1 = ptX + width;
                    x2 = x1 + caretSize;
                    y1 = y2 - caretSize;
                    y3 = y2 + caretSize;
                }
                x3 = x1;
            } else {
                if (xAlign === "left") x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize; else if (xAlign === "right") x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize; else x2 = this.caretX;
                if (yAlign === "top") {
                    y1 = ptY;
                    y2 = y1 - caretSize;
                    x1 = x2 - caretSize;
                    x3 = x2 + caretSize;
                } else {
                    y1 = ptY + height;
                    y2 = y1 + caretSize;
                    x1 = x2 + caretSize;
                    x3 = x2 - caretSize;
                }
                y3 = y1;
            }
            return {
                x1,
                x2,
                x3,
                y1,
                y2,
                y3
            };
        }
        drawTitle(pt, ctx, options) {
            const title = this.title;
            const length = title.length;
            let titleFont, titleSpacing, i;
            if (length) {
                const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                pt.x = getAlignedX(this, options.titleAlign, options);
                ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
                ctx.textBaseline = "middle";
                titleFont = toFont(options.titleFont);
                titleSpacing = options.titleSpacing;
                ctx.fillStyle = options.titleColor;
                ctx.font = titleFont.string;
                for (i = 0; i < length; ++i) {
                    ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                    pt.y += titleFont.lineHeight + titleSpacing;
                    if (i + 1 === length) pt.y += options.titleMarginBottom - titleSpacing;
                }
            }
        }
        _drawColorBox(ctx, pt, i, rtlHelper, options) {
            const labelColor = this.labelColors[i];
            const labelPointStyle = this.labelPointStyles[i];
            const {boxHeight, boxWidth} = options;
            const bodyFont = toFont(options.bodyFont);
            const colorX = getAlignedX(this, "left", options);
            const rtlColorX = rtlHelper.x(colorX);
            const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
            const colorY = pt.y + yOffSet;
            if (options.usePointStyle) {
                const drawOptions = {
                    radius: Math.min(boxWidth, boxHeight) / 2,
                    pointStyle: labelPointStyle.pointStyle,
                    rotation: labelPointStyle.rotation,
                    borderWidth: 1
                };
                const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
                const centerY = colorY + boxHeight / 2;
                ctx.strokeStyle = options.multiKeyBackground;
                ctx.fillStyle = options.multiKeyBackground;
                drawPoint(ctx, drawOptions, centerX, centerY);
                ctx.strokeStyle = labelColor.borderColor;
                ctx.fillStyle = labelColor.backgroundColor;
                drawPoint(ctx, drawOptions, centerX, centerY);
            } else {
                ctx.lineWidth = helpers_segment_isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
                ctx.strokeStyle = labelColor.borderColor;
                ctx.setLineDash(labelColor.borderDash || []);
                ctx.lineDashOffset = labelColor.borderDashOffset || 0;
                const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
                const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
                const borderRadius = toTRBLCorners(labelColor.borderRadius);
                if (Object.values(borderRadius).some((v => v !== 0))) {
                    ctx.beginPath();
                    ctx.fillStyle = options.multiKeyBackground;
                    addRoundedRectPath(ctx, {
                        x: outerX,
                        y: colorY,
                        w: boxWidth,
                        h: boxHeight,
                        radius: borderRadius
                    });
                    ctx.fill();
                    ctx.stroke();
                    ctx.fillStyle = labelColor.backgroundColor;
                    ctx.beginPath();
                    addRoundedRectPath(ctx, {
                        x: innerX,
                        y: colorY + 1,
                        w: boxWidth - 2,
                        h: boxHeight - 2,
                        radius: borderRadius
                    });
                    ctx.fill();
                } else {
                    ctx.fillStyle = options.multiKeyBackground;
                    ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                    ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                    ctx.fillStyle = labelColor.backgroundColor;
                    ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
                }
            }
            ctx.fillStyle = this.labelTextColors[i];
        }
        drawBody(pt, ctx, options) {
            const {body} = this;
            const {bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding} = options;
            const bodyFont = toFont(options.bodyFont);
            let bodyLineHeight = bodyFont.lineHeight;
            let xLinePadding = 0;
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            const fillLineOfText = function(line) {
                ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
                pt.y += bodyLineHeight + bodySpacing;
            };
            const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
            let bodyItem, textColor, lines, i, j, ilen, jlen;
            ctx.textAlign = bodyAlign;
            ctx.textBaseline = "middle";
            ctx.font = bodyFont.string;
            pt.x = getAlignedX(this, bodyAlignForCalculation, options);
            ctx.fillStyle = options.bodyColor;
            each(this.beforeBody, fillLineOfText);
            xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
            for (i = 0, ilen = body.length; i < ilen; ++i) {
                bodyItem = body[i];
                textColor = this.labelTextColors[i];
                ctx.fillStyle = textColor;
                each(bodyItem.before, fillLineOfText);
                lines = bodyItem.lines;
                if (displayColors && lines.length) {
                    this._drawColorBox(ctx, pt, i, rtlHelper, options);
                    bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
                }
                for (j = 0, jlen = lines.length; j < jlen; ++j) {
                    fillLineOfText(lines[j]);
                    bodyLineHeight = bodyFont.lineHeight;
                }
                each(bodyItem.after, fillLineOfText);
            }
            xLinePadding = 0;
            bodyLineHeight = bodyFont.lineHeight;
            each(this.afterBody, fillLineOfText);
            pt.y -= bodySpacing;
        }
        drawFooter(pt, ctx, options) {
            const footer = this.footer;
            const length = footer.length;
            let footerFont, i;
            if (length) {
                const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                pt.x = getAlignedX(this, options.footerAlign, options);
                pt.y += options.footerMarginTop;
                ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
                ctx.textBaseline = "middle";
                footerFont = toFont(options.footerFont);
                ctx.fillStyle = options.footerColor;
                ctx.font = footerFont.string;
                for (i = 0; i < length; ++i) {
                    ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                    pt.y += footerFont.lineHeight + options.footerSpacing;
                }
            }
        }
        drawBackground(pt, ctx, tooltipSize, options) {
            const {xAlign, yAlign} = this;
            const {x, y} = pt;
            const {width, height} = tooltipSize;
            const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(options.cornerRadius);
            ctx.fillStyle = options.backgroundColor;
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.beginPath();
            ctx.moveTo(x + topLeft, y);
            if (yAlign === "top") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x + width - topRight, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
            if (yAlign === "center" && xAlign === "right") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x + width, y + height - bottomRight);
            ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
            if (yAlign === "bottom") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x + bottomLeft, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
            if (yAlign === "center" && xAlign === "left") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x, y + topLeft);
            ctx.quadraticCurveTo(x, y, x + topLeft, y);
            ctx.closePath();
            ctx.fill();
            if (options.borderWidth > 0) ctx.stroke();
        }
        _updateAnimationTarget(options) {
            const chart = this.chart;
            const anims = this.$animations;
            const animX = anims && anims.x;
            const animY = anims && anims.y;
            if (animX || animY) {
                const position = positioners[options.position].call(this, this._active, this._eventPosition);
                if (!position) return;
                const size = this._size = getTooltipSize(this, options);
                const positionAndSize = Object.assign({}, position, this._size);
                const alignment = determineAlignment(chart, options, positionAndSize);
                const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
                if (animX._to !== point.x || animY._to !== point.y) {
                    this.xAlign = alignment.xAlign;
                    this.yAlign = alignment.yAlign;
                    this.width = size.width;
                    this.height = size.height;
                    this.caretX = position.x;
                    this.caretY = position.y;
                    this._resolveAnimations().update(this, point);
                }
            }
        }
        _willRender() {
            return !!this.opacity;
        }
        draw(ctx) {
            const options = this.options.setContext(this.getContext());
            let opacity = this.opacity;
            if (!opacity) return;
            this._updateAnimationTarget(options);
            const tooltipSize = {
                width: this.width,
                height: this.height
            };
            const pt = {
                x: this.x,
                y: this.y
            };
            opacity = Math.abs(opacity) < .001 ? 0 : opacity;
            const padding = toPadding(options.padding);
            const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            if (options.enabled && hasTooltipContent) {
                ctx.save();
                ctx.globalAlpha = opacity;
                this.drawBackground(pt, ctx, tooltipSize, options);
                overrideTextDirection(ctx, options.textDirection);
                pt.y += padding.top;
                this.drawTitle(pt, ctx, options);
                this.drawBody(pt, ctx, options);
                this.drawFooter(pt, ctx, options);
                restoreTextDirection(ctx, options.textDirection);
                ctx.restore();
            }
        }
        getActiveElements() {
            return this._active || [];
        }
        setActiveElements(activeElements, eventPosition) {
            const lastActive = this._active;
            const active = activeElements.map((({datasetIndex, index}) => {
                const meta = this.chart.getDatasetMeta(datasetIndex);
                if (!meta) throw new Error("Cannot find a dataset at index " + datasetIndex);
                return {
                    datasetIndex,
                    element: meta.data[index],
                    index
                };
            }));
            const changed = !_elementsEqual(lastActive, active);
            const positionChanged = this._positionChanged(active, eventPosition);
            if (changed || positionChanged) {
                this._active = active;
                this._eventPosition = eventPosition;
                this._ignoreReplayEvents = true;
                this.update(true);
            }
        }
        handleEvent(e, replay, inChartArea = true) {
            if (replay && this._ignoreReplayEvents) return false;
            this._ignoreReplayEvents = false;
            const options = this.options;
            const lastActive = this._active || [];
            const active = this._getActiveElements(e, lastActive, replay, inChartArea);
            const positionChanged = this._positionChanged(active, e);
            const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
            if (changed) {
                this._active = active;
                if (options.enabled || options.external) {
                    this._eventPosition = {
                        x: e.x,
                        y: e.y
                    };
                    this.update(true, replay);
                }
            }
            return changed;
        }
        _getActiveElements(e, lastActive, replay, inChartArea) {
            const options = this.options;
            if (e.type === "mouseout") return [];
            if (!inChartArea) return lastActive.filter((i => this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== void 0));
            const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
            if (options.reverse) active.reverse();
            return active;
        }
        _positionChanged(active, e) {
            const {caretX, caretY, options} = this;
            const position = positioners[options.position].call(this, active, e);
            return position !== false && (caretX !== position.x || caretY !== position.y);
        }
    }
    var plugin_tooltip = {
        id: "tooltip",
        _element: Tooltip,
        positioners,
        afterInit(chart, _args, options) {
            if (options) chart.tooltip = new Tooltip({
                chart,
                options
            });
        },
        beforeUpdate(chart, _args, options) {
            if (chart.tooltip) chart.tooltip.initialize(options);
        },
        reset(chart, _args, options) {
            if (chart.tooltip) chart.tooltip.initialize(options);
        },
        afterDraw(chart) {
            const tooltip = chart.tooltip;
            if (tooltip && tooltip._willRender()) {
                const args = {
                    tooltip
                };
                if (chart.notifyPlugins("beforeTooltipDraw", {
                    ...args,
                    cancelable: true
                }) === false) return;
                tooltip.draw(chart.ctx);
                chart.notifyPlugins("afterTooltipDraw", args);
            }
        },
        afterEvent(chart, args) {
            if (chart.tooltip) {
                const useFinalPosition = args.replay;
                if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) args.changed = true;
            }
        },
        defaults: {
            enabled: true,
            external: null,
            position: "average",
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            titleFont: {
                weight: "bold"
            },
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: "left",
            bodyColor: "#fff",
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: "left",
            footerColor: "#fff",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: {
                weight: "bold"
            },
            footerAlign: "left",
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (ctx, opts) => opts.bodyFont.size,
            boxWidth: (ctx, opts) => opts.bodyFont.size,
            multiKeyBackground: "#fff",
            displayColors: true,
            boxPadding: 0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            animation: {
                duration: 400,
                easing: "easeOutQuart"
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "width", "height", "caretX", "caretY" ]
                },
                opacity: {
                    easing: "linear",
                    duration: 200
                }
            },
            callbacks: defaultCallbacks
        },
        defaultRoutes: {
            bodyFont: "font",
            footerFont: "font",
            titleFont: "font"
        },
        descriptors: {
            _scriptable: name => name !== "filter" && name !== "itemSort" && name !== "external",
            _indexable: false,
            callbacks: {
                _scriptable: false,
                _indexable: false
            },
            animation: {
                _fallback: false
            },
            animations: {
                _fallback: "animation"
            }
        },
        additionalOptionScopes: [ "interaction" ]
    };
    var plugins = Object.freeze({
        __proto__: null,
        Colors: plugin_colors,
        Decimation: plugin_decimation,
        Filler: index,
        Legend: plugin_legend,
        SubTitle: plugin_subtitle,
        Title: plugin_title,
        Tooltip: plugin_tooltip
    });
    const addIfString = (labels, raw, index, addedLabels) => {
        if (typeof raw === "string") {
            index = labels.push(raw) - 1;
            addedLabels.unshift({
                index,
                label: raw
            });
        } else if (isNaN(raw)) index = null;
        return index;
    };
    function findOrAddLabel(labels, raw, index, addedLabels) {
        const first = labels.indexOf(raw);
        if (first === -1) return addIfString(labels, raw, index, addedLabels);
        const last = labels.lastIndexOf(raw);
        return first !== last ? index : first;
    }
    const validIndex = (index, max) => index === null ? null : _limitValue(Math.round(index), 0, max);
    function _getLabelForValue(value) {
        const labels = this.getLabels();
        if (value >= 0 && value < labels.length) return labels[value];
        return value;
    }
    class CategoryScale extends Scale {
        static id="category";
        static defaults={
            ticks: {
                callback: _getLabelForValue
            }
        };
        constructor(cfg) {
            super(cfg);
            this._startValue = void 0;
            this._valueRange = 0;
            this._addedLabels = [];
        }
        init(scaleOptions) {
            const added = this._addedLabels;
            if (added.length) {
                const labels = this.getLabels();
                for (const {index, label} of added) if (labels[index] === label) labels.splice(index, 1);
                this._addedLabels = [];
            }
            super.init(scaleOptions);
        }
        parse(raw, index) {
            if (isNullOrUndef(raw)) return null;
            const labels = this.getLabels();
            index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
            return validIndex(index, labels.length - 1);
        }
        determineDataLimits() {
            const {minDefined, maxDefined} = this.getUserBounds();
            let {min, max} = this.getMinMax(true);
            if (this.options.bounds === "ticks") {
                if (!minDefined) min = 0;
                if (!maxDefined) max = this.getLabels().length - 1;
            }
            this.min = min;
            this.max = max;
        }
        buildTicks() {
            const min = this.min;
            const max = this.max;
            const offset = this.options.offset;
            const ticks = [];
            let labels = this.getLabels();
            labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
            this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
            this._startValue = this.min - (offset ? .5 : 0);
            for (let value = min; value <= max; value++) ticks.push({
                value
            });
            return ticks;
        }
        getLabelForValue(value) {
            return _getLabelForValue.call(this, value);
        }
        configure() {
            super.configure();
            if (!this.isHorizontal()) this._reversePixels = !this._reversePixels;
        }
        getPixelForValue(value) {
            if (typeof value !== "number") value = this.parse(value);
            return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
        }
        getPixelForTick(index) {
            const ticks = this.ticks;
            if (index < 0 || index > ticks.length - 1) return null;
            return this.getPixelForValue(ticks[index].value);
        }
        getValueForPixel(pixel) {
            return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
        }
        getBasePixel() {
            return this.bottom;
        }
    }
    function generateTicks$1(generationOptions, dataRange) {
        const ticks = [];
        const MIN_SPACING = 1e-14;
        const {bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds} = generationOptions;
        const unit = step || 1;
        const maxSpaces = maxTicks - 1;
        const {min: rmin, max: rmax} = dataRange;
        const minDefined = !isNullOrUndef(min);
        const maxDefined = !isNullOrUndef(max);
        const countDefined = !isNullOrUndef(count);
        const minSpacing = (rmax - rmin) / (maxDigits + 1);
        let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
        let factor, niceMin, niceMax, numSpaces;
        if (spacing < MIN_SPACING && !minDefined && !maxDefined) return [ {
            value: rmin
        }, {
            value: rmax
        } ];
        numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
        if (numSpaces > maxSpaces) spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
        if (!isNullOrUndef(precision)) {
            factor = Math.pow(10, precision);
            spacing = Math.ceil(spacing * factor) / factor;
        }
        if (bounds === "ticks") {
            niceMin = Math.floor(rmin / spacing) * spacing;
            niceMax = Math.ceil(rmax / spacing) * spacing;
        } else {
            niceMin = rmin;
            niceMax = rmax;
        }
        if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
            numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
            spacing = (max - min) / numSpaces;
            niceMin = min;
            niceMax = max;
        } else if (countDefined) {
            niceMin = minDefined ? min : niceMin;
            niceMax = maxDefined ? max : niceMax;
            numSpaces = count - 1;
            spacing = (niceMax - niceMin) / numSpaces;
        } else {
            numSpaces = (niceMax - niceMin) / spacing;
            if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) numSpaces = Math.round(numSpaces); else numSpaces = Math.ceil(numSpaces);
        }
        const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
        factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
        niceMin = Math.round(niceMin * factor) / factor;
        niceMax = Math.round(niceMax * factor) / factor;
        let j = 0;
        if (minDefined) if (includeBounds && niceMin !== min) {
            ticks.push({
                value: min
            });
            if (niceMin < min) j++;
            if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) j++;
        } else if (niceMin < min) j++;
        for (;j < numSpaces; ++j) {
            const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
            if (maxDefined && tickValue > max) break;
            ticks.push({
                value: tickValue
            });
        }
        if (maxDefined && includeBounds && niceMax !== max) if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) ticks[ticks.length - 1].value = max; else ticks.push({
            value: max
        }); else if (!maxDefined || niceMax === max) ticks.push({
            value: niceMax
        });
        return ticks;
    }
    function relativeLabelSize(value, minSpacing, {horizontal, minRotation}) {
        const rad = toRadians(minRotation);
        const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || .001;
        const length = .75 * minSpacing * ("" + value).length;
        return Math.min(minSpacing / ratio, length);
    }
    class LinearScaleBase extends Scale {
        constructor(cfg) {
            super(cfg);
            this.start = void 0;
            this.end = void 0;
            this._startValue = void 0;
            this._endValue = void 0;
            this._valueRange = 0;
        }
        parse(raw, index) {
            if (isNullOrUndef(raw)) return null;
            if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) return null;
            return +raw;
        }
        handleTickRangeOptions() {
            const {beginAtZero} = this.options;
            const {minDefined, maxDefined} = this.getUserBounds();
            let {min, max} = this;
            const setMin = v => min = minDefined ? min : v;
            const setMax = v => max = maxDefined ? max : v;
            if (beginAtZero) {
                const minSign = sign(min);
                const maxSign = sign(max);
                if (minSign < 0 && maxSign < 0) setMax(0); else if (minSign > 0 && maxSign > 0) setMin(0);
            }
            if (min === max) {
                let offset = max === 0 ? 1 : Math.abs(max * .05);
                setMax(max + offset);
                if (!beginAtZero) setMin(min - offset);
            }
            this.min = min;
            this.max = max;
        }
        getTickLimit() {
            const tickOpts = this.options.ticks;
            let {maxTicksLimit, stepSize} = tickOpts;
            let maxTicks;
            if (stepSize) {
                maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
                if (maxTicks > 1e3) {
                    console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                    maxTicks = 1e3;
                }
            } else {
                maxTicks = this.computeTickLimit();
                maxTicksLimit = maxTicksLimit || 11;
            }
            if (maxTicksLimit) maxTicks = Math.min(maxTicksLimit, maxTicks);
            return maxTicks;
        }
        computeTickLimit() {
            return Number.POSITIVE_INFINITY;
        }
        buildTicks() {
            const opts = this.options;
            const tickOpts = opts.ticks;
            let maxTicks = this.getTickLimit();
            maxTicks = Math.max(2, maxTicks);
            const numericGeneratorOptions = {
                maxTicks,
                bounds: opts.bounds,
                min: opts.min,
                max: opts.max,
                precision: tickOpts.precision,
                step: tickOpts.stepSize,
                count: tickOpts.count,
                maxDigits: this._maxDigits(),
                horizontal: this.isHorizontal(),
                minRotation: tickOpts.minRotation || 0,
                includeBounds: tickOpts.includeBounds !== false
            };
            const dataRange = this._range || this;
            const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
            if (opts.bounds === "ticks") _setMinAndMaxByKey(ticks, this, "value");
            if (opts.reverse) {
                ticks.reverse();
                this.start = this.max;
                this.end = this.min;
            } else {
                this.start = this.min;
                this.end = this.max;
            }
            return ticks;
        }
        configure() {
            const ticks = this.ticks;
            let start = this.min;
            let end = this.max;
            super.configure();
            if (this.options.offset && ticks.length) {
                const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
                start -= offset;
                end += offset;
            }
            this._startValue = start;
            this._endValue = end;
            this._valueRange = end - start;
        }
        getLabelForValue(value) {
            return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
        }
    }
    class LinearScale extends LinearScaleBase {
        static id="linear";
        static defaults={
            ticks: {
                callback: Ticks.formatters.numeric
            }
        };
        determineDataLimits() {
            const {min, max} = this.getMinMax(true);
            this.min = isNumberFinite(min) ? min : 0;
            this.max = isNumberFinite(max) ? max : 1;
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
            const horizontal = this.isHorizontal();
            const length = horizontal ? this.width : this.height;
            const minRotation = toRadians(this.options.ticks.minRotation);
            const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || .001;
            const tickFont = this._resolveTickFontOptions(0);
            return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
        }
        getPixelForValue(value) {
            return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
        }
        getValueForPixel(pixel) {
            return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
        }
    }
    const log10Floor = v => Math.floor(log10(v));
    const changeExponent = (v, m) => Math.pow(10, log10Floor(v) + m);
    function isMajor(tickVal) {
        const remain = tickVal / Math.pow(10, log10Floor(tickVal));
        return remain === 1;
    }
    function steps(min, max, rangeExp) {
        const rangeStep = Math.pow(10, rangeExp);
        const start = Math.floor(min / rangeStep);
        const end = Math.ceil(max / rangeStep);
        return end - start;
    }
    function startExp(min, max) {
        const range = max - min;
        let rangeExp = log10Floor(range);
        while (steps(min, max, rangeExp) > 10) rangeExp++;
        while (steps(min, max, rangeExp) < 10) rangeExp--;
        return Math.min(rangeExp, log10Floor(min));
    }
    function generateTicks(generationOptions, {min, max}) {
        min = finiteOrDefault(generationOptions.min, min);
        const ticks = [];
        const minExp = log10Floor(min);
        let exp = startExp(min, max);
        let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
        const stepSize = Math.pow(10, exp);
        const base = minExp > exp ? Math.pow(10, minExp) : 0;
        const start = Math.round((min - base) * precision) / precision;
        const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
        let significand = Math.floor((start - offset) / Math.pow(10, exp));
        let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
        while (value < max) {
            ticks.push({
                value,
                major: isMajor(value),
                significand
            });
            if (significand >= 10) significand = significand < 15 ? 15 : 20; else significand++;
            if (significand >= 20) {
                exp++;
                significand = 2;
                precision = exp >= 0 ? 1 : precision;
            }
            value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
        }
        const lastTick = finiteOrDefault(generationOptions.max, value);
        ticks.push({
            value: lastTick,
            major: isMajor(lastTick),
            significand
        });
        return ticks;
    }
    class LogarithmicScale extends Scale {
        static id="logarithmic";
        static defaults={
            ticks: {
                callback: Ticks.formatters.logarithmic,
                major: {
                    enabled: true
                }
            }
        };
        constructor(cfg) {
            super(cfg);
            this.start = void 0;
            this.end = void 0;
            this._startValue = void 0;
            this._valueRange = 0;
        }
        parse(raw, index) {
            const value = LinearScaleBase.prototype.parse.apply(this, [ raw, index ]);
            if (value === 0) {
                this._zero = true;
                return;
            }
            return isNumberFinite(value) && value > 0 ? value : null;
        }
        determineDataLimits() {
            const {min, max} = this.getMinMax(true);
            this.min = isNumberFinite(min) ? Math.max(0, min) : null;
            this.max = isNumberFinite(max) ? Math.max(0, max) : null;
            if (this.options.beginAtZero) this._zero = true;
            if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
            this.handleTickRangeOptions();
        }
        handleTickRangeOptions() {
            const {minDefined, maxDefined} = this.getUserBounds();
            let min = this.min;
            let max = this.max;
            const setMin = v => min = minDefined ? min : v;
            const setMax = v => max = maxDefined ? max : v;
            if (min === max) if (min <= 0) {
                setMin(1);
                setMax(10);
            } else {
                setMin(changeExponent(min, -1));
                setMax(changeExponent(max, +1));
            }
            if (min <= 0) setMin(changeExponent(max, -1));
            if (max <= 0) setMax(changeExponent(min, +1));
            this.min = min;
            this.max = max;
        }
        buildTicks() {
            const opts = this.options;
            const generationOptions = {
                min: this._userMin,
                max: this._userMax
            };
            const ticks = generateTicks(generationOptions, this);
            if (opts.bounds === "ticks") _setMinAndMaxByKey(ticks, this, "value");
            if (opts.reverse) {
                ticks.reverse();
                this.start = this.max;
                this.end = this.min;
            } else {
                this.start = this.min;
                this.end = this.max;
            }
            return ticks;
        }
        getLabelForValue(value) {
            return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
        }
        configure() {
            const start = this.min;
            super.configure();
            this._startValue = log10(start);
            this._valueRange = log10(this.max) - log10(start);
        }
        getPixelForValue(value) {
            if (value === void 0 || value === 0) value = this.min;
            if (value === null || isNaN(value)) return NaN;
            return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
        }
        getValueForPixel(pixel) {
            const decimal = this.getDecimalForPixel(pixel);
            return Math.pow(10, this._startValue + decimal * this._valueRange);
        }
    }
    function getTickBackdropHeight(opts) {
        const tickOpts = opts.ticks;
        if (tickOpts.display && opts.display) {
            const padding = toPadding(tickOpts.backdropPadding);
            return valueOrDefault(tickOpts.font && tickOpts.font.size, helpers_segment_defaults.font.size) + padding.height;
        }
        return 0;
    }
    function measureLabelSize(ctx, font, label) {
        label = isArray(label) ? label : [ label ];
        return {
            w: _longestText(ctx, font.string, label),
            h: label.length * font.lineHeight
        };
    }
    function determineLimits(angle, pos, size, min, max) {
        if (angle === min || angle === max) return {
            start: pos - size / 2,
            end: pos + size / 2
        }; else if (angle < min || angle > max) return {
            start: pos - size,
            end: pos
        };
        return {
            start: pos,
            end: pos + size
        };
    }
    function fitWithPointLabels(scale) {
        const orig = {
            l: scale.left + scale._padding.left,
            r: scale.right - scale._padding.right,
            t: scale.top + scale._padding.top,
            b: scale.bottom - scale._padding.bottom
        };
        const limits = Object.assign({}, orig);
        const labelSizes = [];
        const padding = [];
        const valueCount = scale._pointLabels.length;
        const pointLabelOpts = scale.options.pointLabels;
        const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
        for (let i = 0; i < valueCount; i++) {
            const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
            padding[i] = opts.padding;
            const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
            const plFont = toFont(opts.font);
            const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
            labelSizes[i] = textSize;
            const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
            const angle = Math.round(toDegrees(angleRadians));
            const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
            const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
            updateLimits(limits, orig, angleRadians, hLimits, vLimits);
        }
        scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
        scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
    }
    function updateLimits(limits, orig, angle, hLimits, vLimits) {
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
        let x = 0;
        let y = 0;
        if (hLimits.start < orig.l) {
            x = (orig.l - hLimits.start) / sin;
            limits.l = Math.min(limits.l, orig.l - x);
        } else if (hLimits.end > orig.r) {
            x = (hLimits.end - orig.r) / sin;
            limits.r = Math.max(limits.r, orig.r + x);
        }
        if (vLimits.start < orig.t) {
            y = (orig.t - vLimits.start) / cos;
            limits.t = Math.min(limits.t, orig.t - y);
        } else if (vLimits.end > orig.b) {
            y = (vLimits.end - orig.b) / cos;
            limits.b = Math.max(limits.b, orig.b + y);
        }
    }
    function createPointLabelItem(scale, index, itemOpts) {
        const outerDistance = scale.drawingArea;
        const {extra, additionalAngle, padding, size} = itemOpts;
        const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
        const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
        const y = yForAngle(pointLabelPosition.y, size.h, angle);
        const textAlign = getTextAlignForAngle(angle);
        const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
        return {
            visible: true,
            x: pointLabelPosition.x,
            y,
            textAlign,
            left,
            top: y,
            right: left + size.w,
            bottom: y + size.h
        };
    }
    function isNotOverlapped(item, area) {
        if (!area) return true;
        const {left, top, right, bottom} = item;
        const apexesInArea = _isPointInArea({
            x: left,
            y: top
        }, area) || _isPointInArea({
            x: left,
            y: bottom
        }, area) || _isPointInArea({
            x: right,
            y: top
        }, area) || _isPointInArea({
            x: right,
            y: bottom
        }, area);
        return !apexesInArea;
    }
    function buildPointLabelItems(scale, labelSizes, padding) {
        const items = [];
        const valueCount = scale._pointLabels.length;
        const opts = scale.options;
        const {centerPointLabels, display} = opts.pointLabels;
        const itemOpts = {
            extra: getTickBackdropHeight(opts) / 2,
            additionalAngle: centerPointLabels ? PI / valueCount : 0
        };
        let area;
        for (let i = 0; i < valueCount; i++) {
            itemOpts.padding = padding[i];
            itemOpts.size = labelSizes[i];
            const item = createPointLabelItem(scale, i, itemOpts);
            items.push(item);
            if (display === "auto") {
                item.visible = isNotOverlapped(item, area);
                if (item.visible) area = item;
            }
        }
        return items;
    }
    function getTextAlignForAngle(angle) {
        if (angle === 0 || angle === 180) return "center"; else if (angle < 180) return "left";
        return "right";
    }
    function leftForTextAlign(x, w, align) {
        if (align === "right") x -= w; else if (align === "center") x -= w / 2;
        return x;
    }
    function yForAngle(y, h, angle) {
        if (angle === 90 || angle === 270) y -= h / 2; else if (angle > 270 || angle < 90) y -= h;
        return y;
    }
    function drawPointLabelBox(ctx, opts, item) {
        const {left, top, right, bottom} = item;
        const {backdropColor} = opts;
        if (!isNullOrUndef(backdropColor)) {
            const borderRadius = toTRBLCorners(opts.borderRadius);
            const padding = toPadding(opts.backdropPadding);
            ctx.fillStyle = backdropColor;
            const backdropLeft = left - padding.left;
            const backdropTop = top - padding.top;
            const backdropWidth = right - left + padding.width;
            const backdropHeight = bottom - top + padding.height;
            if (Object.values(borderRadius).some((v => v !== 0))) {
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                    x: backdropLeft,
                    y: backdropTop,
                    w: backdropWidth,
                    h: backdropHeight,
                    radius: borderRadius
                });
                ctx.fill();
            } else ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
        }
    }
    function drawPointLabels(scale, labelCount) {
        const {ctx, options: {pointLabels}} = scale;
        for (let i = labelCount - 1; i >= 0; i--) {
            const item = scale._pointLabelItems[i];
            if (!item.visible) continue;
            const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
            drawPointLabelBox(ctx, optsAtIndex, item);
            const plFont = toFont(optsAtIndex.font);
            const {x, y, textAlign} = item;
            renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
                color: optsAtIndex.color,
                textAlign,
                textBaseline: "middle"
            });
        }
    }
    function pathRadiusLine(scale, radius, circular, labelCount) {
        const {ctx} = scale;
        if (circular) ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU); else {
            let pointPosition = scale.getPointPosition(0, radius);
            ctx.moveTo(pointPosition.x, pointPosition.y);
            for (let i = 1; i < labelCount; i++) {
                pointPosition = scale.getPointPosition(i, radius);
                ctx.lineTo(pointPosition.x, pointPosition.y);
            }
        }
    }
    function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
        const ctx = scale.ctx;
        const circular = gridLineOpts.circular;
        const {color, lineWidth} = gridLineOpts;
        if (!circular && !labelCount || !color || !lineWidth || radius < 0) return;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash(borderOpts.dash);
        ctx.lineDashOffset = borderOpts.dashOffset;
        ctx.beginPath();
        pathRadiusLine(scale, radius, circular, labelCount);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    function createPointLabelContext(parent, index, label) {
        return createContext(parent, {
            label,
            index,
            type: "pointLabel"
        });
    }
    class RadialLinearScale extends LinearScaleBase {
        static id="radialLinear";
        static defaults={
            display: true,
            animate: true,
            position: "chartArea",
            angleLines: {
                display: true,
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0
            },
            grid: {
                circular: false
            },
            startAngle: 0,
            ticks: {
                showLabelBackdrop: true,
                callback: Ticks.formatters.numeric
            },
            pointLabels: {
                backdropColor: void 0,
                backdropPadding: 2,
                display: true,
                font: {
                    size: 10
                },
                callback(label) {
                    return label;
                },
                padding: 5,
                centerPointLabels: false
            }
        };
        static defaultRoutes={
            "angleLines.color": "borderColor",
            "pointLabels.color": "color",
            "ticks.color": "color"
        };
        static descriptors={
            angleLines: {
                _fallback: "grid"
            }
        };
        constructor(cfg) {
            super(cfg);
            this.xCenter = void 0;
            this.yCenter = void 0;
            this.drawingArea = void 0;
            this._pointLabels = [];
            this._pointLabelItems = [];
        }
        setDimensions() {
            const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
            const w = this.width = this.maxWidth - padding.width;
            const h = this.height = this.maxHeight - padding.height;
            this.xCenter = Math.floor(this.left + w / 2 + padding.left);
            this.yCenter = Math.floor(this.top + h / 2 + padding.top);
            this.drawingArea = Math.floor(Math.min(w, h) / 2);
        }
        determineDataLimits() {
            const {min, max} = this.getMinMax(false);
            this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
            this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
            return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
        }
        generateTickLabels(ticks) {
            LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
            this._pointLabels = this.getLabels().map(((value, index) => {
                const label = callback(this.options.pointLabels.callback, [ value, index ], this);
                return label || label === 0 ? label : "";
            })).filter(((v, i) => this.chart.getDataVisibility(i)));
        }
        fit() {
            const opts = this.options;
            if (opts.display && opts.pointLabels.display) fitWithPointLabels(this); else this.setCenterPoint(0, 0, 0, 0);
        }
        setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
            this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
            this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
            this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
        }
        getIndexAngle(index) {
            const angleMultiplier = TAU / (this._pointLabels.length || 1);
            const startAngle = this.options.startAngle || 0;
            return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
        }
        getDistanceFromCenterForValue(value) {
            if (isNullOrUndef(value)) return NaN;
            const scalingFactor = this.drawingArea / (this.max - this.min);
            if (this.options.reverse) return (this.max - value) * scalingFactor;
            return (value - this.min) * scalingFactor;
        }
        getValueForDistanceFromCenter(distance) {
            if (isNullOrUndef(distance)) return NaN;
            const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
        }
        getPointLabelContext(index) {
            const pointLabels = this._pointLabels || [];
            if (index >= 0 && index < pointLabels.length) {
                const pointLabel = pointLabels[index];
                return createPointLabelContext(this.getContext(), index, pointLabel);
            }
        }
        getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
            const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
            return {
                x: Math.cos(angle) * distanceFromCenter + this.xCenter,
                y: Math.sin(angle) * distanceFromCenter + this.yCenter,
                angle
            };
        }
        getPointPositionForValue(index, value) {
            return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
        }
        getBasePosition(index) {
            return this.getPointPositionForValue(index || 0, this.getBaseValue());
        }
        getPointLabelPosition(index) {
            const {left, top, right, bottom} = this._pointLabelItems[index];
            return {
                left,
                top,
                right,
                bottom
            };
        }
        drawBackground() {
            const {backgroundColor, grid: {circular}} = this.options;
            if (backgroundColor) {
                const ctx = this.ctx;
                ctx.save();
                ctx.beginPath();
                pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
                ctx.closePath();
                ctx.fillStyle = backgroundColor;
                ctx.fill();
                ctx.restore();
            }
        }
        drawGrid() {
            const ctx = this.ctx;
            const opts = this.options;
            const {angleLines, grid, border} = opts;
            const labelCount = this._pointLabels.length;
            let i, offset, position;
            if (opts.pointLabels.display) drawPointLabels(this, labelCount);
            if (grid.display) this.ticks.forEach(((tick, index) => {
                if (index !== 0 || index === 0 && this.min < 0) {
                    offset = this.getDistanceFromCenterForValue(tick.value);
                    const context = this.getContext(index);
                    const optsAtIndex = grid.setContext(context);
                    const optsAtIndexBorder = border.setContext(context);
                    drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
                }
            }));
            if (angleLines.display) {
                ctx.save();
                for (i = labelCount - 1; i >= 0; i--) {
                    const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                    const {color, lineWidth} = optsAtIndex;
                    if (!lineWidth || !color) continue;
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = color;
                    ctx.setLineDash(optsAtIndex.borderDash);
                    ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                    offset = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
                    position = this.getPointPosition(i, offset);
                    ctx.beginPath();
                    ctx.moveTo(this.xCenter, this.yCenter);
                    ctx.lineTo(position.x, position.y);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }
        drawBorder() {}
        drawLabels() {
            const ctx = this.ctx;
            const opts = this.options;
            const tickOpts = opts.ticks;
            if (!tickOpts.display) return;
            const startAngle = this.getIndexAngle(0);
            let offset, width;
            ctx.save();
            ctx.translate(this.xCenter, this.yCenter);
            ctx.rotate(startAngle);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.ticks.forEach(((tick, index) => {
                if (index === 0 && this.min >= 0 && !opts.reverse) return;
                const optsAtIndex = tickOpts.setContext(this.getContext(index));
                const tickFont = toFont(optsAtIndex.font);
                offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
                if (optsAtIndex.showLabelBackdrop) {
                    ctx.font = tickFont.string;
                    width = ctx.measureText(tick.label).width;
                    ctx.fillStyle = optsAtIndex.backdropColor;
                    const padding = toPadding(optsAtIndex.backdropPadding);
                    ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
                }
                renderText(ctx, tick.label, 0, -offset, tickFont, {
                    color: optsAtIndex.color,
                    strokeColor: optsAtIndex.textStrokeColor,
                    strokeWidth: optsAtIndex.textStrokeWidth
                });
            }));
            ctx.restore();
        }
        drawTitle() {}
    }
    const INTERVALS = {
        millisecond: {
            common: true,
            size: 1,
            steps: 1e3
        },
        second: {
            common: true,
            size: 1e3,
            steps: 60
        },
        minute: {
            common: true,
            size: 6e4,
            steps: 60
        },
        hour: {
            common: true,
            size: 36e5,
            steps: 24
        },
        day: {
            common: true,
            size: 864e5,
            steps: 30
        },
        week: {
            common: false,
            size: 6048e5,
            steps: 4
        },
        month: {
            common: true,
            size: 2628e6,
            steps: 12
        },
        quarter: {
            common: false,
            size: 7884e6,
            steps: 4
        },
        year: {
            common: true,
            size: 3154e7
        }
    };
    const UNITS = Object.keys(INTERVALS);
    function sorter(a, b) {
        return a - b;
    }
    function parse(scale, input) {
        if (isNullOrUndef(input)) return null;
        const adapter = scale._adapter;
        const {parser, round, isoWeekday} = scale._parseOpts;
        let value = input;
        if (typeof parser === "function") value = parser(value);
        if (!isNumberFinite(value)) value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
        if (value === null) return null;
        if (round) value = round === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round);
        return +value;
    }
    function determineUnitForAutoTicks(minUnit, min, max, capacity) {
        const ilen = UNITS.length;
        for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
            const interval = INTERVALS[UNITS[i]];
            const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
            if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) return UNITS[i];
        }
        return UNITS[ilen - 1];
    }
    function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
        for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
            const unit = UNITS[i];
            if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) return unit;
        }
        return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
    }
    function determineMajorUnit(unit) {
        for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) if (INTERVALS[UNITS[i]].common) return UNITS[i];
    }
    function addTick(ticks, time, timestamps) {
        if (!timestamps) ticks[time] = true; else if (timestamps.length) {
            const {lo, hi} = _lookup(timestamps, time);
            const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
            ticks[timestamp] = true;
        }
    }
    function setMajorTicks(scale, ticks, map, majorUnit) {
        const adapter = scale._adapter;
        const first = +adapter.startOf(ticks[0].value, majorUnit);
        const last = ticks[ticks.length - 1].value;
        let major, index;
        for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
            index = map[major];
            if (index >= 0) ticks[index].major = true;
        }
        return ticks;
    }
    function ticksFromTimestamps(scale, values, majorUnit) {
        const ticks = [];
        const map = {};
        const ilen = values.length;
        let i, value;
        for (i = 0; i < ilen; ++i) {
            value = values[i];
            map[value] = i;
            ticks.push({
                value,
                major: false
            });
        }
        return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
    }
    class TimeScale extends Scale {
        static id="time";
        static defaults={
            bounds: "data",
            adapters: {},
            time: {
                parser: false,
                unit: false,
                round: false,
                isoWeekday: false,
                minUnit: "millisecond",
                displayFormats: {}
            },
            ticks: {
                source: "auto",
                callback: false,
                major: {
                    enabled: false
                }
            }
        };
        constructor(props) {
            super(props);
            this._cache = {
                data: [],
                labels: [],
                all: []
            };
            this._unit = "day";
            this._majorUnit = void 0;
            this._offsets = {};
            this._normalized = false;
            this._parseOpts = void 0;
        }
        init(scaleOpts, opts = {}) {
            const time = scaleOpts.time || (scaleOpts.time = {});
            const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
            adapter.init(opts);
            mergeIf(time.displayFormats, adapter.formats());
            this._parseOpts = {
                parser: time.parser,
                round: time.round,
                isoWeekday: time.isoWeekday
            };
            super.init(scaleOpts);
            this._normalized = opts.normalized;
        }
        parse(raw, index) {
            if (raw === void 0) return null;
            return parse(this, raw);
        }
        beforeLayout() {
            super.beforeLayout();
            this._cache = {
                data: [],
                labels: [],
                all: []
            };
        }
        determineDataLimits() {
            const options = this.options;
            const adapter = this._adapter;
            const unit = options.time.unit || "day";
            let {min, max, minDefined, maxDefined} = this.getUserBounds();
            function _applyBounds(bounds) {
                if (!minDefined && !isNaN(bounds.min)) min = Math.min(min, bounds.min);
                if (!maxDefined && !isNaN(bounds.max)) max = Math.max(max, bounds.max);
            }
            if (!minDefined || !maxDefined) {
                _applyBounds(this._getLabelBounds());
                if (options.bounds !== "ticks" || options.ticks.source !== "labels") _applyBounds(this.getMinMax(false));
            }
            min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
            max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
            this.min = Math.min(min, max - 1);
            this.max = Math.max(min + 1, max);
        }
        _getLabelBounds() {
            const arr = this.getLabelTimestamps();
            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            if (arr.length) {
                min = arr[0];
                max = arr[arr.length - 1];
            }
            return {
                min,
                max
            };
        }
        buildTicks() {
            const options = this.options;
            const timeOpts = options.time;
            const tickOpts = options.ticks;
            const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
            if (options.bounds === "ticks" && timestamps.length) {
                this.min = this._userMin || timestamps[0];
                this.max = this._userMax || timestamps[timestamps.length - 1];
            }
            const min = this.min;
            const max = this.max;
            const ticks = _filterBetween(timestamps, min, max);
            this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
            this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
            this.initOffsets(timestamps);
            if (options.reverse) ticks.reverse();
            return ticksFromTimestamps(this, ticks, this._majorUnit);
        }
        afterAutoSkip() {
            if (this.options.offsetAfterAutoskip) this.initOffsets(this.ticks.map((tick => +tick.value)));
        }
        initOffsets(timestamps = []) {
            let start = 0;
            let end = 0;
            let first, last;
            if (this.options.offset && timestamps.length) {
                first = this.getDecimalForValue(timestamps[0]);
                if (timestamps.length === 1) start = 1 - first; else start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
                last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
                if (timestamps.length === 1) end = last; else end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
            }
            const limit = timestamps.length < 3 ? .5 : .25;
            start = _limitValue(start, 0, limit);
            end = _limitValue(end, 0, limit);
            this._offsets = {
                start,
                end,
                factor: 1 / (start + 1 + end)
            };
        }
        _generate() {
            const adapter = this._adapter;
            const min = this.min;
            const max = this.max;
            const options = this.options;
            const timeOpts = options.time;
            const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
            const stepSize = valueOrDefault(options.ticks.stepSize, 1);
            const weekday = minor === "week" ? timeOpts.isoWeekday : false;
            const hasWeekday = isNumber(weekday) || weekday === true;
            const ticks = {};
            let first = min;
            let time, count;
            if (hasWeekday) first = +adapter.startOf(first, "isoWeek", weekday);
            first = +adapter.startOf(first, hasWeekday ? "day" : minor);
            if (adapter.diff(max, min, minor) > 1e5 * stepSize) throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
            const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
            for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), 
            count++) addTick(ticks, time, timestamps);
            if (time === max || options.bounds === "ticks" || count === 1) addTick(ticks, time, timestamps);
            return Object.keys(ticks).sort(sorter).map((x => +x));
        }
        getLabelForValue(value) {
            const adapter = this._adapter;
            const timeOpts = this.options.time;
            if (timeOpts.tooltipFormat) return adapter.format(value, timeOpts.tooltipFormat);
            return adapter.format(value, timeOpts.displayFormats.datetime);
        }
        format(value, format) {
            const options = this.options;
            const formats = options.time.displayFormats;
            const unit = this._unit;
            const fmt = format || formats[unit];
            return this._adapter.format(value, fmt);
        }
        _tickFormatFunction(time, index, ticks, format) {
            const options = this.options;
            const formatter = options.ticks.callback;
            if (formatter) return callback(formatter, [ time, index, ticks ], this);
            const formats = options.time.displayFormats;
            const unit = this._unit;
            const majorUnit = this._majorUnit;
            const minorFormat = unit && formats[unit];
            const majorFormat = majorUnit && formats[majorUnit];
            const tick = ticks[index];
            const major = majorUnit && majorFormat && tick && tick.major;
            return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
        }
        generateTickLabels(ticks) {
            let i, ilen, tick;
            for (i = 0, ilen = ticks.length; i < ilen; ++i) {
                tick = ticks[i];
                tick.label = this._tickFormatFunction(tick.value, i, ticks);
            }
        }
        getDecimalForValue(value) {
            return value === null ? NaN : (value - this.min) / (this.max - this.min);
        }
        getPixelForValue(value) {
            const offsets = this._offsets;
            const pos = this.getDecimalForValue(value);
            return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
        }
        getValueForPixel(pixel) {
            const offsets = this._offsets;
            const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
            return this.min + pos * (this.max - this.min);
        }
        _getLabelSize(label) {
            const ticksOpts = this.options.ticks;
            const tickLabelWidth = this.ctx.measureText(label).width;
            const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
            const cosRotation = Math.cos(angle);
            const sinRotation = Math.sin(angle);
            const tickFontSize = this._resolveTickFontOptions(0).size;
            return {
                w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
                h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
            };
        }
        _getLabelCapacity(exampleTime) {
            const timeOpts = this.options.time;
            const displayFormats = timeOpts.displayFormats;
            const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
            const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [ exampleTime ], this._majorUnit), format);
            const size = this._getLabelSize(exampleLabel);
            const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
            return capacity > 0 ? capacity : 1;
        }
        getDataTimestamps() {
            let timestamps = this._cache.data || [];
            let i, ilen;
            if (timestamps.length) return timestamps;
            const metas = this.getMatchingVisibleMetas();
            if (this._normalized && metas.length) return this._cache.data = metas[0].controller.getAllParsedValues(this);
            for (i = 0, ilen = metas.length; i < ilen; ++i) timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
            return this._cache.data = this.normalize(timestamps);
        }
        getLabelTimestamps() {
            const timestamps = this._cache.labels || [];
            let i, ilen;
            if (timestamps.length) return timestamps;
            const labels = this.getLabels();
            for (i = 0, ilen = labels.length; i < ilen; ++i) timestamps.push(parse(this, labels[i]));
            return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
        }
        normalize(values) {
            return _arrayUnique(values.sort(sorter));
        }
    }
    function chart_interpolate(table, val, reverse) {
        let lo = 0;
        let hi = table.length - 1;
        let prevSource, nextSource, prevTarget, nextTarget;
        if (reverse) {
            if (val >= table[lo].pos && val <= table[hi].pos) ({lo, hi} = _lookupByKey(table, "pos", val));
            ({pos: prevSource, time: prevTarget} = table[lo]);
            ({pos: nextSource, time: nextTarget} = table[hi]);
        } else {
            if (val >= table[lo].time && val <= table[hi].time) ({lo, hi} = _lookupByKey(table, "time", val));
            ({time: prevSource, pos: prevTarget} = table[lo]);
            ({time: nextSource, pos: nextTarget} = table[hi]);
        }
        const span = nextSource - prevSource;
        return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
    }
    class TimeSeriesScale extends TimeScale {
        static id="timeseries";
        static defaults=TimeScale.defaults;
        constructor(props) {
            super(props);
            this._table = [];
            this._minPos = void 0;
            this._tableRange = void 0;
        }
        initOffsets() {
            const timestamps = this._getTimestampsForTable();
            const table = this._table = this.buildLookupTable(timestamps);
            this._minPos = chart_interpolate(table, this.min);
            this._tableRange = chart_interpolate(table, this.max) - this._minPos;
            super.initOffsets(timestamps);
        }
        buildLookupTable(timestamps) {
            const {min, max} = this;
            const items = [];
            const table = [];
            let i, ilen, prev, curr, next;
            for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
                curr = timestamps[i];
                if (curr >= min && curr <= max) items.push(curr);
            }
            if (items.length < 2) return [ {
                time: min,
                pos: 0
            }, {
                time: max,
                pos: 1
            } ];
            for (i = 0, ilen = items.length; i < ilen; ++i) {
                next = items[i + 1];
                prev = items[i - 1];
                curr = items[i];
                if (Math.round((next + prev) / 2) !== curr) table.push({
                    time: curr,
                    pos: i / (ilen - 1)
                });
            }
            return table;
        }
        _generate() {
            const min = this.min;
            const max = this.max;
            let timestamps = super.getDataTimestamps();
            if (!timestamps.includes(min) || !timestamps.length) timestamps.splice(0, 0, min);
            if (!timestamps.includes(max) || timestamps.length === 1) timestamps.push(max);
            return timestamps.sort(((a, b) => a - b));
        }
        _getTimestampsForTable() {
            let timestamps = this._cache.all || [];
            if (timestamps.length) return timestamps;
            const data = this.getDataTimestamps();
            const label = this.getLabelTimestamps();
            if (data.length && label.length) timestamps = this.normalize(data.concat(label)); else timestamps = data.length ? data : label;
            timestamps = this._cache.all = timestamps;
            return timestamps;
        }
        getDecimalForValue(value) {
            return (chart_interpolate(this._table, value) - this._minPos) / this._tableRange;
        }
        getValueForPixel(pixel) {
            const offsets = this._offsets;
            const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
            return chart_interpolate(this._table, decimal * this._tableRange + this._minPos, true);
        }
    }
    var scales = Object.freeze({
        __proto__: null,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale
    });
    const registerables = [ controllers, chart_elements, plugins, scales ];
    Chart.register(...registerables);
    const auto = Chart;
    /*!
 * Circle Progress - v1.0.0-beta.0 - 2023-07-17
 * https://tigrr.github.io/circle-progress/
 * Copyright (c) Tigran Sargsyan
 * Licensed MIT
 */
    class CustomElement extends HTMLElement {
        static styles="";
        static props={};
        #propToAttrDict={};
        #attrToPropDict={};
        #boolProps=new Set;
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
            });
            const {styles} = this.constructor;
            if (styles) {
                const style = document.createElement("style");
                style.textContent = styles;
                shadowRoot.append(style);
            }
            const {props} = this.constructor;
            if (props) for (const [prop, config] of Object.entries(props)) {
                if (config.attribute) {
                    this.#propToAttrDict[prop] = config.attribute;
                    this.#attrToPropDict[config.attribute] = prop;
                }
                if (config.type === Boolean) this.#boolProps.add(prop);
            }
        }
        attributeUpdated(prop, value) {}
        _attrNameToProp(name) {
            return this.#attrToPropDict[name] ?? name;
        }
        _propToAttrName(name) {
            return this.#propToAttrDict[name] ?? name;
        }
        _attrValToProp(name, value) {
            if (this.#boolProps.has(name)) return value !== null;
            return value;
        }
        #bailOutAttrUpdate=false;
        attributeChangedCallback(name, _, newValue) {
            if (this.#bailOutAttrUpdate) {
                this.#bailOutAttrUpdate = false;
                return;
            }
            this.attributeUpdated?.(this._attrNameToProp(name), this._attrValToProp(name, newValue));
        }
        reflectPropToAttribute(prop) {
            const value = this[prop];
            this.#bailOutAttrUpdate = true;
            const attr = this._propToAttrName(prop);
            if (this.#boolProps.has(prop)) if (value) this.setAttribute(attr, ""); else this.removeAttribute(attr); else if (typeof value === "function") this.removeAttribute(attr); else this.setAttribute(attr, String(value));
        }
    }
    const paper = function(container, width, height, doc) {
        doc = doc || document;
        const me = Object.create(paperProto);
        if (typeof container === "string") container = doc.querySelector(container);
        if (!container) return;
        const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("version", "1.1");
        if (width) svg.setAttribute("width", String(width));
        if (height) svg.setAttribute("height", String(height));
        if (width && height) svg.setAttribute("viewBox", "0 0 " + width + " " + height);
        container.appendChild(svg);
        me.svg = svg;
        return me;
    };
    const paperProto = {
        element: function(name, attrs, content, parent) {
            const el = circle_progress_element(this, name, attrs, parent);
            if (content) el.el.innerHTML = content;
            return el;
        }
    };
    const circle_progress_element = function(paper, name, attrs, parent, doc) {
        doc = doc || document;
        const me = Object.create(elementProto);
        me.el = doc.createElementNS("http://www.w3.org/2000/svg", name);
        me.attr(attrs);
        (parent ? "el" in parent ? parent.el : parent : paper.svg).appendChild(me.el);
        return me;
    };
    const elementProto = {
        attr: function(name, value) {
            if (name === void 0) return this;
            if (typeof name === "object") {
                for (let key in name) this.attr(key, name[key]);
                return this;
            }
            if (value === void 0) return this.el.getAttributeNS(null, name);
            this.el.setAttribute(name, value);
            return this;
        },
        content: function(content) {
            this.el.innerHTML = content;
            return this;
        }
    };
    const circle_progress_animator = function(easing, startValue, valueChange, dur, cb) {
        const easeFunc = typeof easing === "string" ? easings[easing] : easing;
        let tStart;
        let animHandle;
        const frame = function(t) {
            if (!tStart) tStart = t;
            t -= tStart;
            t = Math.min(t, dur);
            const curVal = easeFunc(t, startValue, valueChange, dur);
            cb(curVal);
            if (t < dur) animHandle = requestAnimationFrame(frame); else cb(startValue + valueChange);
        };
        animHandle = requestAnimationFrame(frame);
        return {
            cancel: () => {
                cancelAnimationFrame(animHandle);
            }
        };
    };
    const easings = {
        linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        easeInQuad: function(t, b, c, d) {
            t /= d;
            return c * t * t + b;
        },
        easeOutQuad: function(t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        },
        easeInOutQuad: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        easeInCubic: function(t, b, c, d) {
            t /= d;
            return c * t * t * t + b;
        },
        easeOutCubic: function(t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        },
        easeInOutCubic: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        },
        easeInQuart: function(t, b, c, d) {
            t /= d;
            return c * t * t * t * t + b;
        },
        easeOutQuart: function(t, b, c, d) {
            t /= d;
            t--;
            return -c * (t * t * t * t - 1) + b;
        },
        easeInOutQuart: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        },
        easeInQuint: function(t, b, c, d) {
            t /= d;
            return c * t * t * t * t * t + b;
        },
        easeOutQuint: function(t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t * t * t + 2) + b;
        },
        easeInSine: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function(t, b, c, d) {
            return c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            t--;
            return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
        },
        easeInCirc: function(t, b, c, d) {
            t /= d;
            return -c * (Math.sqrt(1 - t * t) - 1) + b;
        },
        easeOutCirc: function(t, b, c, d) {
            t /= d;
            t--;
            return c * Math.sqrt(1 - t * t) + b;
        },
        easeInOutCirc: function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            t -= 2;
            return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
        }
    };
    const polarToCartesian = (r, angle) => ({
        x: r * Math.cos(angle * Math.PI / 180),
        y: r * Math.sin(angle * Math.PI / 180)
    });
    const makeSectorPath = (cx, cy, r, startAngle, angle, clockwise = false) => {
        if (angle > 0 && angle < .3) angle = 0; else if (angle > 359.999) angle = 359.999;
        const endAngle = startAngle + angle * (+clockwise * 2 - 1);
        const startCoords = polarToCartesian(r, startAngle);
        const endCoords = polarToCartesian(r, endAngle);
        const x1 = cx + startCoords.x;
        const x2 = cx + endCoords.x;
        const y1 = cy + startCoords.y;
        const y2 = cy + endCoords.y;
        return [ "M", x1, y1, "A", r, r, 0, +(angle > 180), +clockwise, x2, y2 ].join(" ");
    };
    var styles = `\n\t:host(:not([hidden])) {\n\t\tdisplay: inline-block;\n\t}\n\n\t.circle {\n\t\tfill: none;\n\t\tstroke: #ddd;\n\t}\n\n\t.value {\n\t\tfill: none;\n\t\tstroke: #00E699;\n\t}\n\n\t.text {\n\t\tfont: 16px Arial, sans-serif;\n\t\ttext-anchor: middle;\n\t\tfill: #999;\n\t}\n\n\t:host([text-format="valueOnCircle"]) .text-value {\n\t\tfont-size: 12px;\n\t\tfill: #fff;\n\t}\n\n\t:host([text-format="valueOnCircle"]) .text-max {\n\t\tfont-size: 22px;\n\t\tfont-weight: bold;\n\t\tfill: #ddd;\n\t}\n\n\t:host([text-format="vertical"]) .text-separator {\n\t\tfont-family: Arial, sans-serif !important;\n\t}\n`;
    const ariaAttrs = {
        value: "aria-valuenow",
        min: "aria-valuemin",
        max: "aria-valuemax"
    };
    class CircleProgress extends CustomElement {
        static styles=styles;
        value;
        min;
        max;
        startAngle;
        anticlockwise;
        unconstrained;
        indeterminateText;
        textFormat;
        animation;
        animationDuration;
        static props={
            value: true,
            min: true,
            max: true,
            startAngle: {
                attribute: "start-angle"
            },
            anticlockwise: {
                type: Boolean
            },
            unconstrained: {
                type: Boolean
            },
            indeterminateText: {
                attribute: "indeterminate-text"
            },
            textFormat: {
                attribute: "text-format"
            },
            animation: true,
            animationDuration: {
                attribute: "animation-duration"
            }
        };
        static get observedAttributes() {
            return Object.entries(this.props).map((([name, config]) => config && typeof config === "object" && config.attribute || name));
        }
        static defaults={
            startAngle: 0,
            min: 0,
            max: 1,
            unconstrained: false,
            indeterminateText: "?",
            anticlockwise: false,
            textFormat: "horizontal",
            animation: "easeInOutCubic",
            animationDuration: 600
        };
        constructor(opts = {}) {
            super();
            Object.defineProperties(this, Object.keys(CircleProgress.props).reduce(((descriptors, prop) => {
                descriptors[prop] = {
                    get() {
                        return this._get(prop);
                    },
                    set(val) {
                        this.attr(prop, val);
                    }
                };
                return descriptors;
            }), {}));
            let circleThickness;
            opts = {
                ...CircleProgress.defaults,
                ...opts
            };
            circleThickness = opts.textFormat === "valueOnCircle" ? 16 : 8;
            this.graph = {
                paper: paper(this.shadowRoot, 100, 100),
                value: 0
            };
            this.graph.paper.svg.setAttribute("class", "base");
            this.graph.paper.svg.setAttribute("part", "base");
            this.graph.paper.svg.setAttribute("role", "progressbar");
            this.graph.circle = this.graph.paper.element("circle").attr({
                class: "circle",
                part: "circle",
                cx: 50,
                cy: 50,
                r: 50 - circleThickness / 2,
                "stroke-width": circleThickness
            });
            this.graph.sector = this.graph.paper.element("path").attr({
                d: makeSectorPath(50, 50, 50 - circleThickness / 2, 0, 0),
                class: "value",
                part: "value",
                "stroke-width": circleThickness
            });
            this.graph.text = this.graph.paper.element("text", {
                class: "text",
                part: "text",
                x: 50,
                y: 50
            });
            this._initText();
            Object.keys(CircleProgress.props).forEach((key => key in opts && this._set(key, opts[key])));
        }
        attributeUpdated(name, newValue) {
            this._set(name, newValue);
        }
        #attrs={};
        attr(attrs) {
            if (![ "string", "object" ].includes(typeof attrs)) throw new TypeError(`Wrong argument passed to attr. Expected object, got "${typeof attrs}"`);
            if (typeof attrs === "string") {
                if (arguments.length === 1) return this._get(attrs);
                attrs = [ [ attrs, arguments[1] ] ];
            }
            if (!Array.isArray(attrs)) attrs = Object.keys(attrs).map((key => [ key, attrs[key] ]));
            attrs.forEach((([key, value]) => this._set(key, value)));
            return this;
        }
        _get(key) {
            this._flushBatch();
            return this.#attrs[key];
        }
        _set(key, val) {
            val = this._formatValue(key, val);
            if (val === void 0) throw new TypeError(`Failed to set the ${key} property on CircleProgress: The provided value is non-finite.`);
            this._scheduleUpdate(key, val);
        }
        #batch=null;
        updateComplete=null;
        _scheduleUpdate(key, val) {
            if (!this.#batch) {
                this.#batch = {};
                this.updateComplete = Promise.resolve().then((() => this._flushBatch()));
            }
            this.#batch[key] = val;
        }
        _flushBatch() {
            if (!this.#batch) return;
            const batch = this.#batch;
            this.#batch = null;
            let min = batch.min ?? this.#attrs.min;
            let max = batch.max ?? this.#attrs.max;
            if ("min" in batch && batch.min >= max) min = batch.min = max;
            if ("max" in batch && batch.max <= min) max = batch.max = min;
            if ("value" in batch && !(batch.unconstrained ?? this.#attrs.unconstrained)) {
                if (min != null && batch.value < min) batch.value = min;
                if (max != null && batch.value > max) batch.value = max;
            }
            for (const [key, val] of Object.entries(batch)) {
                if (this.#attrs[key] === val) continue;
                this.#attrs[key] = val;
                if (key in ariaAttrs) if (val !== void 0) this.graph.paper.svg.setAttribute(ariaAttrs[key], val); else this.graph.paper.svg.removeAttribute(ariaAttrs[key]);
                if ([ "min", "max", "unconstrained" ].includes(key) && (this.value > this.max || this.value < this.min)) this.value = Math.min(this.max, Math.max(this.min, this.value));
                if (key === "textFormat") {
                    this._initText();
                    const circleThickness = val === "valueOnCircle" ? 16 : 8;
                    this.graph.sector.attr("stroke-width", circleThickness);
                    this.graph.circle.attr("stroke-width", circleThickness);
                }
                this.reflectPropToAttribute(key);
            }
            this.updateGraph();
        }
        _formatValue(key, val) {
            switch (key) {
              case "value":
              case "min":
              case "max":
                val = Number(val);
                if (!Number.isFinite(val)) val = void 0;
                break;

              case "startAngle":
                val = Number(val);
                if (!Number.isFinite(val)) val = void 0; else val = Math.max(0, Math.min(360, val));
                break;

              case "anticlockwise":
              case "unconstrained":
                val = !!val;
                break;

              case "indeterminateText":
                val = String(val);
                break;

              case "textFormat":
                if (typeof val !== "function" && ![ "valueOnCircle", "horizontal", "vertical", "percent", "value", "none" ].includes(val)) throw new Error(`Failed to set the "textFormat" property on CircleProgress: the provided value "${val}" is not a legal textFormat identifier.`);
                break;

              case "animation":
                if (typeof val !== "string" && typeof val !== "function") throw new TypeError(`Failed to set "animation" property on CircleProgress: the value must be either string or function, ${typeof val} passed.`);
                if (typeof val === "string" && val !== "none" && !easings[val]) throw new Error(`Failed to set "animation" on CircleProgress: the provided value ${val} is not a legal easing function name.`);
                break;
            }
            return val;
        }
        _valueToAngle(value = this.value) {
            return Math.min(360, Math.max(0, (value - this.min) / (this.max - this.min) * 360));
        }
        _isIndeterminate() {
            return [ "value", "max", "min" ].some((key => typeof this[key] !== "number"));
        }
        _positionValueText(angle, r) {
            const coords = polarToCartesian(r, angle);
            this.graph.textVal.attr({
                x: 50 + coords.x,
                y: 50 + coords.y
            });
        }
        _initText() {
            const format = this.textFormat;
            this.graph.text.content("");
            if (typeof format === "string" && [ "valueOnCircle", "horizontal", "vertical" ].includes(format)) {
                this.graph.textVal = this.graph.paper.element("tspan", {
                    class: "text-value",
                    part: "text-value"
                }, "", this.graph.text);
                if ([ "horizontal", "vertical" ].includes(format)) this.graph.textSeparator = this.graph.paper.element("tspan", {
                    class: "text-separator",
                    part: "text-separator"
                }, "", this.graph.text);
                this.graph.textMax = this.graph.paper.element("tspan", {
                    class: "text-max",
                    part: "text-max"
                }, "", this.graph.text);
            }
            switch (format) {
              case "valueOnCircle":
                this.graph.textVal.attr({
                    x: 0,
                    y: 0,
                    dy: "0.4em"
                });
                this.graph.textMax.attr({
                    x: 50,
                    y: 50,
                    dy: "0.4em"
                });
                break;

              case "horizontal":
                this.graph.textSeparator.content("/");
                break;

              case "vertical":
                this.graph.textVal.attr({
                    x: 50,
                    dy: "-0.25em"
                });
                this.graph.textSeparator.attr({
                    x: 50,
                    dy: "0.1em"
                }).content("___");
                this.graph.textMax.attr({
                    x: 50,
                    dy: "1.2em"
                });
                break;
            }
            this.graph.text.attr("dy", format === "vertical" ? "" : "0.4em");
        }
        #animator=null;
        updateGraph() {
            const startAngle = this.startAngle - 90;
            const r = this.getRadius();
            this.#animator?.cancel();
            if (!this._isIndeterminate()) {
                const clockwise = !this.anticlockwise;
                let angle = this._valueToAngle();
                this.graph.circle.attr("r", r);
                if (this.animation !== "none" && this.value !== this.graph.value) this.#animator = circle_progress_animator(this.animation, this.graph.value, this.value - this.graph.value, this.animationDuration, (value => {
                    angle = this._valueToAngle(value);
                    this.graph.sector.attr("d", makeSectorPath(50, 50, r, startAngle, angle, clockwise));
                    this._updateText(value === this.value ? value : Math.round(value), (2 * startAngle + angle) / 2, r);
                })); else {
                    this.graph.sector.attr("d", makeSectorPath(50, 50, r, startAngle, angle, clockwise));
                    this._updateText(this.value, (2 * startAngle + angle) / 2, r);
                }
                this.graph.value = this.value;
            } else this._updateText(this.value, startAngle, r);
        }
        _updateText(value, angle, r) {
            if (typeof this.textFormat === "function") {
                this.graph.text.content(this.textFormat(value, this.max));
                return;
            }
            switch (this.textFormat) {
              case "value":
                this.graph.text.el.textContent = value !== void 0 ? value : this.indeterminateText;
                break;

              case "percent":
                this.graph.text.el.textContent = (value !== void 0 && this.max != null ? Math.round(value / this.max * 100) : this.indeterminateText) + "%";
                break;

              case "none":
                this.graph.text.el.textContent = "";
                break;

              default:
                this.graph.textVal.el.textContent = value !== void 0 ? value : this.indeterminateText;
                this.graph.textMax.el.textContent = this.max !== void 0 ? this.max : this.indeterminateText;
                if (this.textFormat === "valueOnCircle") this._positionValueText(angle, r);
            }
        }
        getRadius() {
            return 50 - Math.max(this._getStrokeWidth(this.graph.circle.el), this._getStrokeWidth(this.graph.sector.el)) / 2;
        }
        _getStrokeWidth(el) {
            return Number.parseFloat(this.ownerDocument.defaultView?.getComputedStyle(el)["stroke-width"] || 0);
        }
    }
    customElements.define("circle-progress", CircleProgress);
    document.addEventListener("DOMContentLoaded", (function() {
        var headingScroll = document.querySelector(".heading");
        if (headingScroll !== null) window.addEventListener("scroll", (function() {
            var scrollPosition = window.scrollY;
            if (scrollPosition > 1) headingScroll.classList.add("_heading-scroll"); else headingScroll.classList.remove("_heading-scroll");
        }));
        const courseItems = document.querySelector(".courses__items");
        let data;
        let startItem = 0;
        let endItem = 3;
        if (courseItems) loadCourseItems();
        async function loadCourseItems() {
            const response = await fetch("files/courses.json", {
                method: "GET"
            });
            if (response.ok) {
                const responseResult = await response.json();
                data = responseResult;
                initCourse(data, startItem, endItem);
            } else alert("Error!");
        }
        function initCourse(data, startItem, endItem) {
            const dataPart = data.items.slice(startItem, endItem);
            dataPart.forEach((item => {
                buildCourseItem(item);
            }));
            viewMore();
        }
        function buildCourseItem(item) {
            let courseItemTemplate = ``;
            courseItemTemplate += `<article data-id="${item.id}" class="course">`;
            item.image ? courseItemTemplate += `<div class="course__image"><img src="${item.image}" alt="Image"></div>` : null;
            courseItemTemplate += `<div class="course__content">`;
            courseItemTemplate += `<a target="_blank" href="${item.url}" class="course__title">${item.title}</a>`;
            courseItemTemplate += `<div class="course__form form-course">`;
            courseItemTemplate += `<div class="form-course__name">${item.name}</div>`;
            courseItemTemplate += `<div class="form-course__rate _icon-rate">${item.rate}</div>`;
            courseItemTemplate += `<div class="form-course__cost">${item.price}</div>`;
            courseItemTemplate += `</div>`;
            courseItemTemplate += `<div class="course__labels labels-course">`;
            courseItemTemplate += `<div class="labels-course__item _icon-clock">${item.clock}</div>`;
            courseItemTemplate += `<div class="labels-course__item _icon-stack">${item.stack}</div>`;
            courseItemTemplate += `<div class="labels-course__item _icon-level">${item.level}</div>`;
            courseItemTemplate += `</div>`;
            courseItemTemplate += `</div>`;
            courseItemTemplate += `</article>`;
            courseItems.insertAdjacentHTML("beforeend", courseItemTemplate);
        }
        document.addEventListener("click", documentActions);
        function viewMore() {
            const dataItemsLength = data.items.length;
            const currentItems = document.querySelectorAll(".course").length;
            const vewMore = document.querySelector(".courses__view-more");
            currentItems < dataItemsLength ? vewMore.style.display = "inline-flex" : vewMore.style.display = "none";
        }
        function documentActions(e) {
            const targetElement = e.target;
            if (targetElement.closest(".courses__view-more")) {
                startItem = document.querySelectorAll(".course").length;
                endItem = startItem + 3;
                initCourse(data, startItem, endItem);
                e.preventDefault();
            }
        }
        const buttonResetCategory = document.querySelector(".aside-category__reset");
        const checkboxCategory = document.querySelectorAll(".checkbox input");
        if (buttonResetCategory !== null) buttonResetCategory.addEventListener("click", (() => {
            for (let i = 0; i < checkboxCategory.length; i++) checkboxCategory[i].checked = false;
        }));
        const filterCategory = document.querySelector(".aside-category");
        const filterCategoryButtonOpen = document.querySelector(".tabs-category__filter");
        const filterCategoryButtonClose = document.querySelector(".aside-category__close");
        if (filterCategory !== null) {
            filterCategoryButtonOpen.addEventListener("click", (() => {
                bodyLock();
                filterCategory.classList.remove("aside-category--disabled");
            }));
            filterCategoryButtonClose.addEventListener("click", (() => {
                bodyUnlock();
                filterCategory.classList.add("aside-category--disabled");
            }));
        }
        const canvasAcquisitions = document.getElementById("acquisitions");
        if (canvasAcquisitions !== null) (async function() {
            const data = [ {
                day: "S",
                count: 12
            }, {
                day: "M",
                count: 10
            }, {
                day: "T",
                count: 6
            }, {
                day: "W",
                count: 14
            }, {
                day: "T",
                count: 12
            }, {
                day: "F",
                count: 10
            }, {
                day: "S",
                count: 6
            } ];
            new auto(canvasAcquisitions, {
                type: "bar",
                data: {
                    labels: data.map((row => row.day)),
                    datasets: [ {
                        label: "Learning",
                        data: data.map((row => row.count)),
                        backgroundColor: "#7fcdbb",
                        borderRadius: "15",
                        borderWidth: 2,
                        borderSkipped: false
                    }, {
                        label: "Challenge",
                        data: [ 6, 4, 12, 4, 6, 4, 12 ],
                        backgroundColor: "#ffc761",
                        borderRadius: "15",
                        borderWidth: 2,
                        borderSkipped: false
                    } ]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                display: false
                            },
                            beginAtZero: true,
                            ticks: {
                                callback: function(value, index, values) {
                                    if (value === 14) return "14h";
                                    if (value === 12) return "12h";
                                    if (value === 10) return "10h";
                                    if (value === 8) return "8h";
                                    if (value === 6) return "6h";
                                    if (value === 4) return "4h";
                                    if (value === 2) return "2h";
                                    if (value === 0) return "0h";
                                    return value;
                                },
                                font: {
                                    size: 14
                                },
                                color: "#e0e0e0"
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: "#f9f9f9",
                                font: {
                                    size: 18
                                }
                            }
                        }
                    }
                }
            });
        })();
    }));
    window["FLS"] = false;
    isWebp();
    menuInit();
    spollers();
    tabs();
    digitsCounter();
})();