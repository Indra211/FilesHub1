<template>
    <div id="index-container">
        <header class="flex h-1 bg-orange-200 items-center px-7 py-6 rounded-b-lg justify-between">
            <h1 class="text-black font-medium text-xl text-center ">Welcome to FilesHub</h1>
            <div class="flex gap-3">
                <img src="../assets/832.jpg" alt="logo" class="w-10 h-10 ml-auto rounded-lg shadow-md cursor-pointer">
                <img src="../assets/logout.webp" alt="logo"
                    class="w-10 h-10 ml-auto rounded-lg shadow-md cursor-pointer" @click="handleLogout">
            </div>
        </header>
        <main>
            <div v-if="userFiles.length > 0">
                <h3 class="text-white font-medium text-xl text-center mt-10">Your files</h3>
                <div v-for="file in userFiles" :key="file._id">
                    <div class="flex gap-4 bg-sky-100 px-10 py-2 shadow-lg rounded justify-between items-center">
                        <h3 class="text-black font-medium text-xl text-center ">{{ file.name }}</h3>
                        <div>
                            <a v-if="file.file" :download="file.name" :href="file.file"
                                class="bg-blue-500 text-white rounded-lg px-3 py-2">View</a>
                            <button class="bg-red-500 ml-2 text-white rounded-lg px-3 py-2"
                                @click="deleteFile(file._id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3 class="text-white font-medium text-2xl text-center mt-10">No files found</h3>

            </div>
        </main>

        <button class="fixed bottom-10 right-10 bg-blue-500 text-white rounded-lg px-3 py-2" @click="openModal">Upload
            your files</button>
        <Modal :isVisible="isModalVisible" @close="closeModal">
            <div>
                <label class="text-sm font-medium text-black">Select files</label>
                <input type="file" @change="handleFileChange"
                    class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
                <button class="bg-blue-500 text-white rounded-lg px-3 py-2 mt-2 self-centerr"
                    @click="uploadFile">Upload</button>

            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Modal from '../components/modal.vue';
const router = useRouter()
onMounted(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
    }
})
interface UserFile {
    name: string;
    file: string;
    size: number;
    _id: string;
}
const userFiles: Ref<UserFile[]> = ref([]);
const files = ref({
    name: '',
    size: "",
    file: ""
});
const handleFileChange = async (event: any) => {
    const selectedFiles = event.target.files;
    files.value.name = selectedFiles[0].name;
    files.value.size = selectedFiles[0].size;
    const base64data: any = await imgtobase64(selectedFiles[0]);
    files.value.file = base64data
}
const handleLogout = () => {
    removeLocalData("token")
    router.push('/login')
}

const uploadFile = async () => {
    const token = getLocaldata("token");
    try {
        const response = await fetch('/api/file', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(files.value)
        })
        const json = await response.json();
        if (json?.success) {
            alert("File uploaded successfully");
            closeModal();
            getFiles();
        }
    } catch (error) {
        console.error(error);
    }
}


const getFiles = async () => {
    const token = getLocaldata("token");
    try {
        const response = await fetch('/api/file', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        });
        const json = await response.json();
        console.log(json);

        userFiles.value = json
        console.log(json[0]?.file);

    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    getFiles()
})

const isModalVisible = ref(false);
const openModal = () => {
    isModalVisible.value = true;
};
const closeModal = () => {
    isModalVisible.value = false;
};

const deleteFile = async (id: string) => {

    const token = getLocaldata("token");
    try {
        const response = await fetch(`/api/file/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const json = await response.json();
        if (json?.success) {
            alert("File deleted successfully");
            getFiles();
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
#index-container {
    background: url("../assets/bg.jpg");
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0;
    margin: 0;
    position: relative;
}

header {
    font-style: italic;
}
</style>
