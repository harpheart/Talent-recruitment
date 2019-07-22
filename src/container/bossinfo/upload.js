import React, { Component } from 'react';
import { Upload, Icon, message,Modal, Button ,Slider } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import "./up.css";
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);

  }
  
  function beforeUpload(file) {
    const isCorrect = file.type === 'image/jpeg'||'image/jpg'||'image/png';
    if (!isCorrect) {
      message.error('你只能上传jpeg,jpg,png格式的头像!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('t头像大小不能超过2M!');
    }
    return isCorrect && isLt2M;
  }
  
class UpLoad extends Component {
constructor(props) {
    super(props);
    this.state = {
        loading: false,
        visible: false,
        show:false,
        inputValue: 1,
        imageUrl:''
      };
}
handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj,imageUrl => this.setState({
        imageUrl,
        loading: false,
        visible: true,
      })
    
    );
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    if (this.editor) {       
        const canvasScaled = this.editor.getImageScaledToCanvas();
        this.setState({imageUrl:canvasScaled.toDataURL()})
        this.props.myAvatar(canvasScaled.toDataURL())
        
    }
    this.setState({
      visible: false,
      show:true
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  setEditorRef = (editor) => this.editor = editor
  handleScale=(value) => {
    this.setState({
      inputValue: value,
    });
  }
    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const imageUrl = this.state.imageUrl;
          return (
              <div>
           <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/user/image"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl&&!this.state.visible&&this.state.show ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>



           <Modal
          title="上传头像"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="mod"
        >
        <AvatarEditor
   ref={this.setEditorRef}
   image={this.state.imageUrl}
   width={200}
   height={200}
   border={50}
   color={[248, 249, 250, 0.8]}
   borderRadius={200}
   scale={parseFloat(this.state.inputValue)}
   style={{ cursor: 'move', margin: '10px 0' }}
/>
<Slider
  onChange={this.handleScale}
  min={1}
  max={2}
  step={0.01}
  value={this.state.inputValue}
  style={{ width: 280, margin: '10px auto' }}
/>
        </Modal>
              </div>
           
            
          );
        }
    
}

export default UpLoad;