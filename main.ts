input.onGesture(Gesture.LogoUp, function () {
    if (!(isCar)) {
        radio.sendValue("DIR", 0)
        basic.showArrow(ArrowNames.South)
    }
})
input.onGesture(Gesture.TiltRight, function () {
    if (!(isCar)) {
        radio.sendValue("DIR", 2)
        basic.showArrow(ArrowNames.East)
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (!(isCar)) {
        radio.sendValue("DIR", 3)
        basic.showArrow(ArrowNames.West)
    }
})
input.onGesture(Gesture.LogoDown, function () {
    if (!(isCar)) {
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
        }
        if (name == "LED") {
            if (value == 0) {
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            } else if (value == 1) {
                maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            } else if (value == 2) {
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            } else {
                maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
            }
        }
    }
})
input.onGesture(Gesture.ScreenUp, function () {
    if (!(isCar)) {
        radio.sendValue("DIR", 4)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
})
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
    basic.pause(1000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
}
