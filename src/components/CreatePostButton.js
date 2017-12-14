import React from 'react';
import { Modal, Button, message } from 'antd';
import { WrappedCreatePostForm } from './CreatePostForm';
import { POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY } from "../constants";
import $ from 'jquery';
import { PropTypes } from 'prop-types';

export class CreatePostButton extends React.Component {
    static propTypes = {
        loadNearbyPosts: PropTypes.func.isRequired,
    }

    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        //1.get value
        const form = this.form.getWrappedForm(); //获得增强的form
        form.validateFields((err, values) => {
            if (err) { return; } //不submit
            console.log('Received values of form: ', values);

            //prepare formData
            const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
            const formData = new FormData();
            formData.set('lat', lat + Math.random() * 0.1 - 0.05); //每次加一个随机的偏移
            formData.set('lon', lon + Math.random() * 0.1 - 0.05);
            formData.set('message', form.getFieldValue('message'));
            formData.set('image', form.getFieldValue('image')[0]);

            //send request
            this.setState({ confirmLoading: true });
            $.ajax({
                method: 'POST',
                url: `${API_ROOT}/post`,
                headers: {
                    Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                },
                processData: false,
                contentType: false,
                dataType: 'text',
                data: formData,
            }).then(() => {
                message.success('created a post successfully.');
                form.resetFields();
            },(error) => {  //发request有问题
                message.error(error.responseText);
                form.resetFields();
            }).then(() => {
                this.props.loadNearbyPosts().then(() => {
                    this.setState({ visible: false, confirmLoading: false });
                });
            }).catch((e) => {
                message.error('create post failed.');
                console.error(e);
            });

        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => { //拿到的是里面的form
        this.form = form; //存下
    }


    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal title="Create New Post"
                       visible={visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       okText="Create"
                       cancelText="Cancel"
                       confirmLoading={confirmLoading}
                >
                    <WrappedCreatePostForm wrappedComponentRef={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}