import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { change } from 'redux-form';

import { connect } from 'react-redux';
import { 
    uploadStaticImage2Loader, 
    doUploadStaticImageBlock
 } from '../../../../actions/siteadmin/manageStaticBlock';
 import { injectIntl } from 'react-intl';
 import messages from '../../../../locale/messages';
class Dropzone extends Component {

    static propTypes = {
        doUploadStaticImageBlock: PropTypes.any.isRequired,
        uploadStaticImageLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        image: null
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadStaticImageBlock, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != null ? data[0].value : null;
        let filePath = fromServer.file.path;
        doUploadStaticImageBlock(fileName, filePath, oldPicture, 'carCounterImage1');
        await change('StaticBlockForm', 'carCounterImage1', fileName);
    }

    addedfile(file, fromServer) {
        const { uploadStaticImage2Loader } = this.props;
        uploadStaticImage2Loader();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadImage),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            // maxFiles: 1
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadHomeBanner'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    uploadStaticImage2Loader,
    doUploadStaticImageBlock,
    change    
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
