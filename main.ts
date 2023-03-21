input.onButtonPressed(Button.A, function () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
})
basic.showString("MaQueen")
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
basic.pause(1000)
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 0)

maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
