import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropzoneComponent from 'react-dropzone-component';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import { connect } from 'react-redux';
import { startBannerUploaderLoader, doUploadImageBanner } from '../../../actions/siteadmin/manageImageBanner';
import Loader from '../../Loader';
import { injectIntl } from 'react-intl';
//Images
import PictureImage from '../../../../public/AdminIcons/default.svg';
class Dropzone extends Component {

    static propTypes = {
        doUploadImageBanner: PropTypes.any.isRequired,
        startBannerUploaderLoader: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
        this.state = {
            djsConfig: {},
            load: true
        }
    }
    componentDidUpdate(prevProps) {
        const { placeholder } = this.props;
        const { locale } = this.props.intl;
        const { locale: prevLocale } = prevProps.intl;

        if (locale !== prevLocale) {
            this.setState({ load: false });
            clearTimeout(this.loadSync);
            this.loadSync = null;
            this.setState({
                djsConfig: {
                  dictDefaultMessage: placeholder,
                  addRemoveLinks: false,
                  maxFilesize: 10,
                  maxFiles: 20,
                  acceptedFiles: 'image/jpeg,image/png',
                  hiddenInputContainer: '.dzInputContainer',
                  // dictFileTooBig: '',
                }
              });
            this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
        }
    }
    componentDidMount() {
        const { placeholder } = this.props;
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
          document.querySelector(".dz-hidden-input").style.visibility = 'visible';
          document.querySelector(".dz-hidden-input").style.opacity = '0';
          document.querySelector(".dz-hidden-input").style.height = '100%';
          document.querySelector(".dz-hidden-input").style.width = '100%';
          document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
        if (placeholder) {
            this.setState({
                djsConfig: {
                  dictDefaultMessage: placeholder,
                  addRemoveLinks: false,
                  maxFilesize: 10,
                  maxFiles: 20,
                  acceptedFiles: 'image/jpeg,image/png',
                  hiddenInputContainer: '.dzInputContainer',
                  // dictFileTooBig: '',
                }
              });
            }
      }

      UNSAFE_componentWillMount(){
        const { placeholder } = this.props;

        if (placeholder) {
            this.setState({
                djsConfig: {
                  dictDefaultMessage: placeholder,
                  addRemoveLinks: false,
                  maxFilesize: 10,
                  maxFiles: 20,
                  acceptedFiles: 'image/jpeg,image/png',
                  hiddenInputContainer: '.dzInputContainer',
                  // dictFileTooBig: '',
                }
              });
            }
      }

    success(file, fromServer) {
        const { doUploadImageBanner, data } = this.props;
        let fileName = fromServer.file.filename;
        let oldImage = data != undefined ? data : null;
        doUploadImageBanner(fileName, oldImage);
    }

    addedfile(file, fromServer) {
        const { startBannerUploaderLoader } = this.props;
        startBannerUploaderLoader();
    }

    render() {

        // const djsConfig = {
        //     dictDefaultMessage: 'Drag and Drop your logo or click here to upload',
        //     addRemoveLinks: false,
        //     uploadMultiple: false,
        //     maxFilesize: 10,
        //     acceptedFiles: 'image/jpeg,image/png',
        //     dictMaxFilesExceeded: 'Remove the existing image and try upload again',
        //     previewsContainer: false
        // };
        const { djsConfig, load } = this.state;
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadBanner'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div className={'listPhotoContainer'}>
                <div className={cx('adminPhotoUplod', 'dzInputContainer')}>
                {!load && <Loader />}
                {load &&
                    <DropzoneComponent
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                    />}
                    <img src={PictureImage} className={'photoUploadImgAdmin'} alt="PictureImage" />
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    doUploadImageBanner,
    startBannerUploaderLoader
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));