import { observable, action } from 'mobx';
import {
  reqProject,
  addProject,
  editProject,
  deleteProject,
  searchProject
} from '../api/index';
import { addMessage, editMessage, deleteMessage } from '../api/message';

class Store {
  @observable productId = 0
  @observable projectId = 0
  @observable page = 1;
  @observable pageSize = 7;
  @observable total;
  @observable list = [];
  @action getProject = async () => {
    console.log(this.page, this.pageSize)
    const res = await reqProject(this.productId, this.page, this.pageSize);
    this.list = res.data.list;
    this.total = res.data.total;
    // console.log(this.list)
    // console.log(this.total);
  };
  @action searchProject = async (target) => {
    const res = await searchProject(this.productId, target, this.page, this.pageSize)
    this.list = res.data.list;
    this.total = res.data.total;
  }
  @action addProject = async Project => {
    const res = await addProject(this.productId, Project);
    addMessage(res.code, res.message);
    return res.code;
  };
  @action editProject = async (id, Project) => {
    const res = await editProject(id, Project);
    // console.log(Project)
    editMessage(res.code, res.message);
    return res.code;
  };
  @action deleteProject = async (id) => {
    const res = await deleteProject(id);
    deleteMessage(res.code, res.message);
  };
}
const ProjectStore = new Store();
export default ProjectStore;
