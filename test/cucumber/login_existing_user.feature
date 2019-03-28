Feature: Login at the system
  Login with an existing user

  Scenario Outline: testdechat6a1 is an user
    Given "<user>" with password "<psswd>"
    When I try to login him
    Then I should be told "<response>"
	
    Examples:
      | user | psswd | response |
	  | testdechat6a1 | Dechat_es6a1 | pass |
	  | testdechat6a1 | hello | deny |