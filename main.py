def on_received_value(name, value):
    if isCar:
        if name == "DIR":
            if value == 0:
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 255)
            elif value == 1:
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, 255)
            elif value == 2:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 100)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            elif value == 3:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 100)
            else:
                maqueen.motor_stop(maqueen.Motors.ALL)
        if name == "LED":
            if value == 0:
                maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_ON)
            elif value == 1:
                maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_OFF)
            elif value == 2:
                maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_ON)
            else:
                maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_OFF)
radio.on_received_value(on_received_value)

isCar = False
radio.set_group(1)
isCar = maqueen.ultrasonic(PingUnit.CENTIMETERS) != 500
if isCar:
    basic.show_leds("""
        . . . . .
                . # # # #
                # # . . #
                # # # # #
                . # . # .
    """)
else:
    basic.show_leds("""
        # # # # #
                . . . . #
                # # # . #
                . . # . #
                # . # . #
    """)
    radio.send_value("DIR", 4)