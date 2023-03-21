def on_button_pressed_a():
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_forever():
    basic.show_string("MaQueen")
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
    basic.pause(1000)
    maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
basic.forever(on_forever)
