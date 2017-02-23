'use strict';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );
var BASE_JS_PATH = '../../../../cfgov/unprocessed/js/';
var ERROR_MESSAGES = require( BASE_JS_PATH + 'config/error-messages-config' );
var validators = require( BASE_JS_PATH + 'modules/util/validators.js' );
var testField;
var returnedObject;

describe( 'Validators date field', function() {
  jsdom();

  beforeEach( function() {
    testField = document.createElement( 'input' );
  } );

  it( 'should return an empty object for a valid date', function() {
    testField.value = '11/12/2007';
    returnedObject = validators.date( testField );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an error object for a malformed date', function() {
    testField.value = '11-12-07';
    returnedObject = validators.date( testField );

    expect( returnedObject ).to.have.property( 'date', false );
    expect( returnedObject )
      .to.have.property( 'msg', ERROR_MESSAGES.DATE.INVALID );
  } );

  it( 'should return an error object for a UTC date', function() {
    testField.value = new Date( 2007, 11, 12 );
    returnedObject = validators.date( testField );

    expect( returnedObject ).to.have.property( 'date', false );
    expect( returnedObject )
      .to.have.property( 'msg', ERROR_MESSAGES.DATE.INVALID );
  } );
} );

describe( 'Validators email field', function() {
  jsdom();

  beforeEach( function() {
    testField = document.createElement( 'input' );
  } );

  it( 'should return an empty object for a valid email', function() {
    testField.value = 'test@demo.com';
    returnedObject = validators.email( testField );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an error object for a missing domain', function() {
    testField.value = 'test';
    returnedObject = validators.email( testField );

    expect( returnedObject ).to.have.property( 'email', false );
    expect( returnedObject )
      .to.have.property( 'msg', ERROR_MESSAGES.EMAIL.INVALID );
  } );

  it( 'should return an error object for a missing user', function() {
    testField.value = '@demo.com';
    returnedObject = validators.email( testField );

    expect( returnedObject ).to.have.property( 'email', false );
    expect( returnedObject )
      .to.have.property( 'msg', ERROR_MESSAGES.EMAIL.INVALID );
  } );
} );

describe( 'Validators empty field', function() {
  jsdom();

  beforeEach( function() {
    testField = document.createElement( 'input' );
    testField.setAttribute( 'required', '' );
  } );

  it( 'should return an empty object for a filed field', function() {
    testField.value = 'testing';
    returnedObject = validators.empty( testField );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an error object for am empty field', function() {
    testField.value = '';
    returnedObject = validators.empty( testField );

    expect( returnedObject ).to.have.property( 'required', false );
    expect( returnedObject )
      .to.have.property( 'msg', ERROR_MESSAGES.FIELD.REQUIRED );
  } );
} );

describe( 'Validators checkbox field', function() {
  jsdom();

  beforeEach( function() {
    testField = document.createElement( 'label' );
    testField.setAttribute( 'name', 'test-checkboxes' );
    testField.setAttribute( 'data-required', '2' );
  } );

  it( 'should return an empty object ' +
      'when total checkboxes equals required total', function() {
    var fieldset = [
      document.createElement( 'input' ),
      document.createElement( 'input' )
    ];
    returnedObject = validators.checkbox( testField, null, fieldset );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an empty object ' +
      'when total checkboxes is more than required total', function() {
    var fieldset = [
      document.createElement( 'input' ),
      document.createElement( 'input' ),
      document.createElement( 'input' )
    ];
    returnedObject = validators.checkbox( testField, null, fieldset );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an error object ' +
       'when total checkboxes is less than required total', function() {
    var fieldset = [
      document.createElement( 'input' )
    ];
    returnedObject = validators.checkbox( testField, null, fieldset );

    expect( returnedObject ).to.have.property( 'checkbox', false );
    expect( returnedObject ).to.have.property(
      'msg', ERROR_MESSAGES.CHECKBOX.REQUIRED.replace( '%s', '2' )
    );
  } );

  it( 'should return an empty object ' +
      'when required total is empty', function() {
    testField.removeAttribute( 'data-required' );
    var fieldset = [
      document.createElement( 'input' )
    ];
    returnedObject = validators.checkbox( testField, null, fieldset );

    expect( returnedObject ).to.be.empty;
  } );
} );

describe( 'Validators radio field', function() {
  jsdom();

  beforeEach( function() {
    testField = document.createElement( 'label' );
    testField.setAttribute( 'name', 'test-radios' );
    testField.setAttribute( 'data-required', '1' );
  } );

  it( 'should return an empty object ' +
      'when total radios equals required total', function() {
    var fieldset = [
      document.createElement( 'input' )
    ];
    returnedObject = validators.radio( testField, null, fieldset );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an empty object ' +
      'when total radios is more than required total', function() {
    var fieldset = [
      document.createElement( 'input' ),
      document.createElement( 'input' )
    ];
    returnedObject = validators.radio( testField, null, fieldset );

    expect( returnedObject ).to.be.empty;
  } );

  it( 'should return an error object ' +
      'when total checkboxes is less than required total', function() {
    var fieldset = [];
    returnedObject = validators.radio( testField, null, fieldset );

    expect( returnedObject ).to.have.property( 'radio', false );
    expect( returnedObject ).to.have.property(
      'msg', ERROR_MESSAGES.CHECKBOX.REQUIRED.replace( '%s', '1' )
    );
  } );

  it( 'should return an empty object ' +
      'when required total is empty', function() {
    testField.removeAttribute( 'data-required' );
    var fieldset = [
      document.createElement( 'input' )
    ];
    returnedObject = validators.radio( testField, null, fieldset );

    expect( returnedObject ).to.be.empty;
  } );
} );
