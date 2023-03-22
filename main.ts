input.onGesture(Gesture.LogoUp, function () {
    if (!(isCar) && actualMode == 0) {
        radio.sendValue("DIR", 0)
        basic.showArrow(ArrowNames.South)
    }
})
input.onButtonPressed(Button.A, function () {
    if (!(isCar)) {
        if (actualMode == 0) {
            radio.sendValue("AUTO", 1)
            basic.showString("A")
            actualMode = 1
        } else {
            radio.sendValue("AUTO", 0)
            actualMode = 0
            basic.showLeds(`
                . . . . .
                . # . # .
                . . # . .
                . # . # .
                . . . . .
                `)
        }
    }
})
input.onGesture(Gesture.TiltRight, function () {
    if (!(isCar) && actualMode == 0) {
        radio.sendValue("DIR", 2)
        basic.showArrow(ArrowNames.East)
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (!(isCar) && actualMode == 0) {
        radio.sendValue("DIR", 3)
        basic.showArrow(ArrowNames.West)
    }
})
input.onGesture(Gesture.LogoDown, function () {
    if (!(isCar) && actualMode == 0) {
        radio.sendValue("DIR", 1)
        basic.showArrow(ArrowNames.North)
    }
})
radio.onReceivedValue(function (name, value) {
    if (isCar) {
        if (name == "DIR") {
            if (value == 0) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 255)
            } else if (value == 1) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
            } else if (value == 2) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 75)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 75)
            } else if (value == 3) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 75)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 75)
            } else {
                maqueen.motorStop(maqueen.Motors.All)
            }
        } else if (name == "AUTO") {
            if (value == 1) {
                autoMode = 1
            } else {
                autoMode = 0
                basic.pause(50)
                maqueen.motorStop(maqueen.Motors.All)
            }
        }
    }
})
input.onGesture(Gesture.ScreenUp, function () {
    if (!(isCar) && actualMode == 0) {
        radio.sendValue("DIR", 4)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
    }
})
let autoMode = 0
let actualMode = 0
let isCar = false
radio.setGroup(1)
isCar = maqueen.Ultrasonic(PingUnit.Centimeters) != 500
if (isCar) {
    basic.showLeds(`
        . . . . .
        . # # # #
        # # . . #
        # # # # #
        . # . # .
        `)
    basic.pause(1000)
    basic.showIcon(IconNames.Happy)
} else {
    basic.showLeds(`
        # # # . .
        . . . # .
        # # . . #
        . . # . #
        # . # . #
        `)
    radio.sendValue("DIR", 4)
    actualMode = 0
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . # . .
        . # . # .
        . . . . .
        `)
}
basic.forever(function () {
    if (autoMode) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 12) {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            while (maqueen.Ultrasonic(PingUnit.Centimeters) < 12) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
            }
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        }
    }
})
