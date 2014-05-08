const int distancePin = 2;

long lastDebounceTime = 0;
long debounceDelay = 1000;

int state = 0;
int reading = HIGH;

void setup() {
  Serial.begin(9600);

  pinMode(distancePin, INPUT);    
}

void loop(){
  reading = digitalRead(distancePin);
  
  if (reading == LOW && state == HIGH) {
    lastDebounceTime = millis();
    
    Serial.print("x");
    
    state = LOW;
  } else if (reading == HIGH && state == LOW && (millis() - lastDebounceTime) > debounceDelay) {
    state = HIGH;

  }

}
