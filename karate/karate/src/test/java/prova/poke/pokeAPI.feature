Feature: Testando PokeAPI.

Background: Executa antes de cada teste a url padrão
    * def url_base = 'https://pokeapi.co/api/v2/'

Scenario: Testar retorno e verificar o tamanho do array, retornando o valor e comparando com a API
    Given url url_base
    And path '/pokemon/snorlax'
    When method get
    Then status 200
    And print karate.sizeOf(response.abilities)
    And match karate.sizeOf(response.abilities) == 3

Scenario: Testar retorno com informações inválidas (caso negativo)
    Given url url_base
    And path 'pokemon/feioso'
    When method get
    Then status 404

Scenario: Criar genêro no pokemon snorlax na API com falha.
    Given url url_base
    And path '/pokemon/snorlax'
    And request {"gender":["Male","Female"]}
    When method post
    Then status 404

Scenario: Deletar experiência no pokemon snorlax na API com falha
    Given url url_base
    And path '/pokemon/snorlax'
    And request {"base_experience":189}
    When method delete
    Then status 404

Scenario: Testar retorno snorlax e conferindo informações sobre o pokemon.
    Given url url_base
    And path '/pokemon/snorlax'
    When method get
    Then status 200
    And match response.name == "snorlax"
    And match $.base_experience == 189
    And match response.id == 143
    And match response.weight == 4600