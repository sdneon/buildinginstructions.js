'use strict';

LDR.Buttons = function (actions, element, addTopButtons, homeLink, mainImage, options) {
    let self = this;
    // Add buttons to element:

    // Camera buttons:
    this.cameraButtons = this.createDiv('camera_buttons');
    this.cameraButtons.setAttribute('class', 'ui_control');
    this.zoomOutButtonLarge = this.createDiv('zoom_out_button_large', actions.zoomOut, undefined, 'Zoom Out');
    this.zoomOutButtonLarge.appendChild(LDR.SVG.makeZoom(false, 2));
    this.cameraButtons.appendChild(this.zoomOutButtonLarge);
    this.resetCameraButton = this.createDiv('reset_camera_button', actions.resetCameraPosition, undefined, 'Reset Camera');
    this.resetCameraButton.appendChild(LDR.SVG.makeCamera(50, 45, 100));
    this.cameraButtons.appendChild(this.resetCameraButton);
    this.zoomInButton = this.createDiv('zoom_in_button', actions.zoomIn, undefined, 'Zoom In');
    this.zoomInButton.appendChild(LDR.SVG.makeZoom(true, 1));
    this.cameraButtons.appendChild(this.zoomInButton);
    this.zoomOutButton = this.createDiv('zoom_out_button', actions.zoomOut, undefined, 'Zoom Out');
    this.zoomOutButton.appendChild(LDR.SVG.makeZoom(false, 1));
    this.cameraButtons.appendChild(this.zoomOutButton);
    this.zoomInButtonLarge = this.createDiv('zoom_in_button_large', actions.zoomIn, undefined, 'Zoom In');
    this.zoomInButtonLarge.appendChild(LDR.SVG.makeZoom(true, 2));
    this.cameraButtons.appendChild(this.zoomInButtonLarge);
    element.appendChild(this.cameraButtons);

    // Back button:
    if (actions.prevStep) {
        this.firstButton = this.createDiv('first_button', actions.firstStep, undefined, 'Go to 1st Step'); //SD
        this.firstButton.appendChild(LDR.SVG.makeDoubleLeftArrow(!addTopButtons));
        this.backButton = this.createDiv('prev_button', actions.prevStep, undefined, 'Previous Step');
        this.backButton.appendChild(LDR.SVG.makeLeftArrow(!addTopButtons));

        if (!addTopButtons) { // In case back should be shown as a lower button:
            element.appendChild(this.firstButton); // back to 1st page button
            element.appendChild(this.backButton); // Add back button to row with camera buttons
        }
    }

    // Right lower corner buttons:
    if (actions.nextStep) {
        this.nextButton = this.createDiv('next_button', actions.nextStep, undefined, 'Next Step');
        this.nextButton.append(LDR.SVG.makeRightArrow(!addTopButtons));
        this.lastButton = this.createDiv('last_button', actions.lastStep, undefined, 'Go to Last Step'); //SD
        this.lastButton.append(LDR.SVG.makeDoubleRightArrow(!addTopButtons));

        if (!addTopButtons) {
            element.appendChild(this.nextButton);
            element.appendChild(this.lastButton);
        }
        else {
            this.nextButtonLarge = this.createDiv('next_button_large', actions.nextStep);
            this.nextButtonLarge.setAttribute('class', 'ui_control');
            //this.lastButtonLarge = this.createDiv('last_button_large', actions.lastStep); //SD
            //this.lastButtonLarge.append(LDR.SVG.makeDoubleRightArrow(!addTopButtons));

            this.doneButton = this.createDiv('done_button', actions.clickDone);
            this.nextButtonLarge.append(LDR.SVG.makeRightArrowLarge());
            this.doneButton.append(LDR.SVG.makeCheckMark());
            element.appendChild(this.nextButtonLarge);
            //element.appendChild(this.lastButton);
            element.appendChild(this.doneButton);
        }
    }

    if (addTopButtons) {
        this.addTopButtonElements(actions, element, homeLink, mainImage, options);
    }

    this.hideElementsAccordingToOptions();

    this.fadeOutHandle;
    let fadeOut = function () {
        self.fadeOutHandle = null;
        $('.ui_control').fadeTo(1000, 0);
    }
    let onFadeInComplete = function () {
        self.fadeOutHandle = setTimeout(fadeOut, 1000);
    }
    fadeOut();

    let runUIFading = function () {
        $('.ui_control').stop(); // Stop fade out.
        if (self.fadeOutHandle) {
            clearTimeout(self.fadeOutHandle);
        }
        self.fadingIn = true;
        $('.ui_control').css('opacity', 1);
        onFadeInComplete();
    };
    $("#main_canvas, #preview, #next_button_large, #next_button, .ui_control").mousemove(runUIFading);
    $(".ui_control").on('tap', runUIFading);
}

LDR.Buttons.prototype.addTopButtonElements = function (actions, element, homeLink, mainImage, options) {
    // Upper row of buttons (added last due to their absolute position):
    this.topButtons = this.createDiv('top_buttons');

    this.firstButton.setAttribute('class', 'top_button');
    this.topButtons.appendChild(this.firstButton);
    this.backButton.setAttribute('class', 'top_button');
    this.topButtons.appendChild(this.backButton);

    this.stepToButton = this.createDiv('stepToContainer');
    this.stepToButton.appendChild(this.makeStepTo());
    this.topButtons.appendChild(this.stepToButton);

    if (options.showNumberOfSteps) {
        let stepsEle = this.createDiv('numberOfSteps');
        this.topButtons.appendChild(stepsEle);
        stepsEle.innerHTML = "/ ?";
    }

    this.homeButton = this.create('a', 'home_button', null, 'top_button');
    this.homeButton.setAttribute('href', homeLink);
    if (mainImage) {
        let img = document.createElement('img');
        img.setAttribute('src', mainImage);
        this.homeButton.appendChild(img);
    }
    else {
        this.homeButton.appendChild(LDR.SVG.makeUpAndBack());
    }
    this.topButtons.appendChild(this.homeButton);

    // Edit:
    if (options.canEdit) {
        let editButton = this.createDiv('editButton');
        editButton.appendChild(LDR.SVG.makeEdit());
        editButton.addEventListener('click', actions.toggleEditor);
        this.topButtons.appendChild(editButton);
    }

    // Options
    if (options.setUpOptions) {
        this.optionsButton = this.createDiv('optionsButton');
        this.optionsButton.setAttribute('class', 'top_button');
        this.optionsButton.appendChild(LDR.SVG.makeOptions());
        this.topButtons.appendChild(this.optionsButton);
    }

    this.nextButton.setAttribute('class', 'top_button');
    this.lastButton.setAttribute('class', 'top_button');
    this.topButtons.appendChild(this.nextButton);
    this.topButtons.appendChild(this.lastButton);

    element.appendChild(this.topButtons);
}

LDR.Buttons.prototype.hideElementsAccordingToOptions = function () {
    if (LDR.Options.showCameraButtons == 2) {
        this.zoomInButtonLarge.style.display = 'none';
        this.zoomOutButtonLarge.style.display = 'none';
        this.zoomInButton.style.display = 'none';
        this.zoomOutButton.style.display = 'none';
        this.resetCameraButton.style.visibility = 'hidden';
    }
    else if (LDR.Options.showCameraButtons == 0) {
        this.zoomInButtonLarge.style.display = 'none';
        this.zoomOutButtonLarge.style.display = 'none';
        this.zoomInButton.style.display = 'inline-block';
        this.zoomOutButton.style.display = 'inline-block';
        this.resetCameraButton.style.visibility = 'inline-block';
    }
    else {
        this.zoomInButton.style.display = 'none';
        this.zoomOutButton.style.display = 'none';
        this.zoomInButtonLarge.style.display = 'inline-block';
        this.zoomOutButtonLarge.style.display = 'inline-block';
        this.resetCameraButton.style.visibility = 'inline-block';
    }
}

// Step to input field:
LDR.Buttons.prototype.makeStepTo = function () {
    this.stepInput = document.createElement("input");
    this.stepInput.setAttribute("id", "pageNumber");
    this.stepInput.setAttribute("onClick", "this.select();");
    return this.stepInput;
}

// Primitive helper methods for creating elements for buttons:
LDR.Buttons.prototype.createDiv = function (id, onclick, classA, tooltip) {
    return this.create('div', id, onclick, classA, tooltip);
}
LDR.Buttons.prototype.create = function (type, id, onclick, classA, tooltip) {
    let ret = document.createElement(type);
    ret.setAttribute('id', id);
    if (onclick) {
        let semaphore = false;
        ret.addEventListener('mouseup', e => { if (!semaphore) { onclick(e); } semaphore = false; });
        ret.addEventListener('touchend', e => { semaphore = true; onclick(e); });
    }
    if (classA) {
        ret.setAttribute('class', classA);
    }
    if ('string' === typeof tooltip) //SD
    {
        ret.setAttribute('data-tooltip-position', 'right');
        ret.setAttribute('data-tooltip', tooltip);
    }
    return ret;
}

// Functions for hiding next/prev buttons:
LDR.Buttons.prototype.atFirstStep = function () {
    this.firstButton.style.visibility = 'hidden';
    this.backButton.style.visibility = 'hidden';
    this.nextButton.style.visibility = 'visible';
    this.lastButton.style.visibility = 'visible';
    if (this.nextButtonLarge) {
        this.nextButtonLarge.style.visibility = 'visible';
    }
    if (this.doneButton) {
        this.doneButton.style.visibility = 'hidden';
    }
}
LDR.Buttons.prototype.atLastStep = function () {
    this.firstButton.style.visibility = 'visible';
    this.backButton.style.visibility = 'visible';
    this.nextButton.style.visibility = 'hidden';
    this.lastButton.style.visibility = 'hidden';
    if (this.nextButtonLarge) {
        this.nextButtonLarge.style.visibility = 'hidden';
    }
    if (this.doneButton) {
        this.doneButton.style.visibility = 'visible';
    }
}
LDR.Buttons.prototype.atAnyOtherStep = function () {
    this.firstButton.style.visibility = 'visible';
    this.backButton.style.visibility = 'visible';
    this.nextButton.style.visibility = 'visible';
    this.lastButton.style.visibility = 'visible';
    if (this.nextButtonLarge) {
        this.nextButtonLarge.style.visibility = 'visible';
    }
    if (this.doneButton) {
        this.doneButton.style.visibility = 'hidden';
    }
}
LDR.Buttons.prototype.setShownStep = function (step) {
    this.stepInput.value = "" + step;
}
