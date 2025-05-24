import React from "react";
import "../Checkout/Checkout";
import { useState, useEffect } from "react";
import LabeledInput from "../Custom/LabeledInput";
import DropdownSelection from "../Custom/DropdownSelection";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./CustomAddress.css";

function CustomAddress({ register }) {
  const [shippingSelected, setshippingSelected] = useState(false);
  const [addressComponents, setAddressComponents] = useState({
    city: "",
    zipcode: "",
    province: "",
    country: "",
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({ callbackName: "initMap" });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address, false);
  };

  const extractAddressComponents = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const components = results[0].address_components;
        let city = "";
        let zipcode = "";
        let country = "";
        let province = "";
        for (let i = 0; i < components.length; i++) {
          const component = components[i];
          const types = component.types;
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("postal_code")) {
            zipcode = component.long_name;
          }
          if (types.includes("country")) {
            country = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            province = component.long_name;
          }
        }
        setAddressComponents({ city, zipcode, province, country });
      }
    });
  };

  useEffect(() => {
    if (value) {
      extractAddressComponents(value);
    }
  }, [value]);

  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));
    return <>{suggestions}</>;
  };

  return (
    <div className="custom_address_container">
      <div className="col-md-15">
        <div className="card">
          <DropdownSelection
            label="Add Address"
            selected={shippingSelected}
            setSelected={setshippingSelected}
          />
          {shippingSelected && (
            <div className="wrapper">
              <div className="row">
                <Combobox className="col-md-12" onSelect={handleSelect}>
                  <label>Address</label>
                  <ComboboxInput
                    name="address"
                    type="text"
                    {...register}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Enter address"
                  />
                  <ComboboxPopover>
                    <ComboboxList>
                      {status === "OK" && renderSuggestions()}
                    </ComboboxList>
                  </ComboboxPopover>
                </Combobox>
                <LabeledInput
                  className="col-md-4"
                  name="city"
                  type="text"
                  label="City"
                  value={addressComponents.city}
                  placeholder="Enter city"
                />
                <LabeledInput
                  className="col-md-4"
                  name="province"
                  type="text"
                  value={addressComponents.province}
                  label="Province"
                  placeholder="Enter province"
                />
                <LabeledInput
                  className="col-md-4"
                  name="postal code"
                  type="text"
                  value={addressComponents.zipcode}
                  label="Postal code"
                  placeholder="Enter postal code"
                />
                <LabeledInput
                  className="col-md-4"
                  name="country"
                  type="text"
                  value={addressComponents.country}
                  label="Country"
                  placeholder="Enter country"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomAddress;
