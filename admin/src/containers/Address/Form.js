import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
// npm i google-map-react
// Run  npm update handlebars --depth 6  to resolve 1 vulnerability
// wow http://google-map-react.github.io/google-map-react/map/balderdash
import MyGreatPlaceWithHover from './my_great_place_with_hover.jsx';
// npm i react-pure-render
import GoogleMapReact from 'google-map-react';

const key="AIzaSyC0OyV5AleQHaNYkrwPC8q2DegYgSagb5E";
const placesScript = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`
const styles = theme => ({
    address: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        flexDirection: "column"
    },
    linea: {
        display: 'flex'
    }
});
export class Form extends Component {

    constructor(props) {
        super(props);

        this.state = { address: '', scriptLoaded: false };
    }

    handleChange = address => {
        this.setState({ address });
    };

    locateString=(param,results)=>{
        var found = results[0].address_components.findIndex((element) => {
            return element.types.find(type => 
                { 
                    return type == param 
                }
            );
        })
        // console.log(found);
        return found;
    }

    handleSelect = address => {
        console.log("selected")
        let json;
        geocodeByAddress(address)
            .then(results => {
                console.log(results)
                let latLng=getLatLng(results[0])
                let country=this.locateString("country",results)
                let zip=this.locateString("postal_code",results)
                let street=this.locateString("street_number",results)
                let state=this.locateString("administrative_area_level_1",results)
                let city=this.locateString("locality",results)
                let calle=this.locateString("route",results) 
                json={
                    country:results[0].address_components[country].long_name,
                    state:results[0].address_components[state].long_name,
                    city:results[0].address_components[city].long_name,
                    zipCode:results[0].address_components[zip].long_name,
                    streetNumber:results[0].address_components[street].long_name,
                    calle:results[0].address_components[calle].long_name,
                }
                return latLng
                }
            )
            .then(latLng => {
                json.LatLng=latLng
                console.log(json)
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
    };

    handleAddress = () => {
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    }

    initMap = () => {
        this.setState({
            scriptLoaded: true,
        })
    }

    componentDidMount() {
        window.initMap = this.initMap
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = placesScript
        gmapScriptEl.async = true
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    }

    //great
    // componentDidUpdate(){
    //     //no utilizar setstate aqui--> loop infinito
    //     console.log(this.state.address)
    //     // this.handleAddress();
    //     geocodeByAddress("hola")
    //         .then(results => getLatLng(results[0]))
    //         .then(latLng => console.log('Success', latLng))
    //         .catch(error => console.error('Error', error));
    // }

    changeDirectionHandler = event => {
        // this.setState({
        //     title: event.target.value
        // });
        const address = event.target.value
        this.setState({ address: event.target.value })
        // this.handleAddress();
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <p>Formulario modificacion direccion {this.props.address.street}</p>
                {this.state.scriptLoaded &&
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />

                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        )}
                    </PlacesAutocomplete>
                }

                <GoogleMapReact
                    //  bootstrapURLKeys={{ key: key }}
                     defaultCenter={this.props.center}
                     defaultZoom={this.props.zoom}
                >
                    <MyGreatPlaceWithHover  
                        lat={59.955413}
                        lng={30.337844}
                        text={'Kreyser Avrora'}
                    />
                </GoogleMapReact>
                <Grid item xs={12}>
                    <p>{this.state.address}</p>
                    <TextField
                        className={classes.textfield}
                        margin="dense"
                        label="Direccion"
                        type="text"
                        fullWidth
                        // value={this.state.shortDescription}
                        onChange={this.changeDirectionHandler}
                    />
                </Grid>
            </div>
        )
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);