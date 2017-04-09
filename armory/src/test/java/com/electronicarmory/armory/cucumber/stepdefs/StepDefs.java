package com.electronicarmory.armory.cucumber.stepdefs;

import com.electronicarmory.armory.ArmoryApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ArmoryApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
