package prova.poke;

import com.intuit.karate.junit5.Karate;

class pokeRunner {
    
    @Karate.Test
    Karate testPoke() {
        return Karate.run("pokeAPI").relativeTo(getClass());
    }    
}