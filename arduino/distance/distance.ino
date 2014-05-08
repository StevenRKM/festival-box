const int distancePin = 2;

long lastDebounceTime = 0;
long debounceDelay = 200;

int state = 0;
int reading = HIGH;

int count = 0;

void setup() {
  Serial.begin(9600);

  pinMode(distancePin, INPUT);    
}

void loop(){
  reading = digitalRead(distancePin);
  
  if (reading == LOW && state == HIGH) {
    lastDebounceTime = millis();
    
    count = count + 1;
    Serial.print("pling ");
    Serial.println(count); 
    
    state = LOW;
  } else if (reading == HIGH && state == LOW && (millis() - lastDebounceTime) > debounceDelay) {
    state = HIGH;

  }

}
